# SQL Literacy: Isolation, Locking, and Idempotency

This guide covers common scenarios in concurrent database access, based on practical workshop experience. Understanding these concepts is crucial for building robust, high-traffic backend applications.

---

## 1. Case Study: Update Race Conditions (The "Last Update Wins" Bug)

### Scenario
A "Meetup Slot" reservation system where multiple users can click "Sign Up" simultaneously.

**Naive Implementation:**
```php
$slot = $db->query("SELECT * FROM meetup_slots WHERE id = 1")->fetch();
if ($slot->speaker_id === null) {
    $db->query("UPDATE meetup_slots SET speaker_id = $userId WHERE id = 1");
}
```

**Problem:** Two users read `speaker_id IS NULL` at the same time. Both execute the `UPDATE`. The second user overwrites the first.

### Solutions:
1.  **Pessimistic Locking (`SELECT FOR UPDATE`)**:
    Locks the row until the transaction commits. Other transactions will wait at the `SELECT` step. Use **`SKIP LOCKED`** if you want to skip rows that are already locked by other transactions (useful for queue implementations).
2.  **Atomic Updates (Recommended)**:
    Combine the check and the update into a single SQL statement:
    ```sql
    UPDATE meetup_slots 
    SET speaker_id = :user_id 
    WHERE id = :id AND speaker_id IS NULL;
    ```
    Always check the number of **Rows Affected**. If it's `0`, the slot was already taken.

---

## 2. Case Study: Idempotency (Handling Retries)

### Scenario
An API endpoint for adding a visitor to a meetup. Due to network failures or message broker (e.g., Kafka) "at-least-once" delivery, the same request might be sent multiple times.

**Problem:** Without protection, the same user might be added to the visitor list multiple times, potentially occupying multiple seats.

### Solution:
1.  **Unique Constraints**: Create a unique index on `(meetup_id, user_id)`.
2.  **Error Handling**:
    Catch the "Duplicate Key" error in your code. If a retry happens, the database will block the second insert. Your application should treat this as a success (or a known state) rather than a failure to ensure the client sees a consistent result.

---

## 3. Case Study: Limit Management (Aggregate Counts)

### Scenario
A meetup has a seat limit (e.g., 100 seats). We must ensure we don't exceed it.

**Naive Implementation:**
```sql
SELECT COUNT(*) FROM visitors WHERE meetup_id = 1; -- Returns 99
-- ... if count < limit, then ...
INSERT INTO visitors (meetup_id, user_id) VALUES (1, 101);
```

**Problem:** Under high concurrency, two parallel transactions might both see `99` and both perform an `INSERT`, exceeding the limit to `101`.

### Solutions:
1.  **Lock the Parent Row**:
    `SELECT * FROM meetups WHERE id = 1 FOR UPDATE;`
    This serializes all registrations for *this specific meetup*.
2.  **Counter Denormalization + CHECK Constraint**:
    Add a `booked_seats` column to the `meetups` table and a `CHECK (booked_seats <= total_seats)`.
    Update the counter in the same transaction as the visitor insert:
    ```sql
    UPDATE meetups SET booked_seats = booked_seats + 1 WHERE id = 1;
    ```
    The database will enforce the `CHECK` constraint across all transactions.

---

## 4. Distributed Locking (Redis vs. SQL)

### When to use Redis:
-   **Rate Limiting**: Preventing a flood of requests from overwhelming the database.
-   **Circuit Breakers**: Temporarily blocking access to a resource if the database is struggling.
-   **Task Locking**: Ensuring a cron job or worker doesn't run concurrently across multiple nodes.

### When to avoid Redis for Data Consistency:
If the consistency you need is *within* the database (e.g., no double-booking), use SQL features (Unique Indexes, Constraints, Row Locks).
-   **Complexity**: Adding Redis adds a failure point.
-   **No Cross-System Atomicity**: You cannot atomically update a Redis key and a SQL row in a single transaction.
-   **TTL Risks**: A Redis lock might expire before a slow SQL transaction finishes.

---

## 5. Developer Checklist

- [ ] **Rows Affected**: Always check `rows_affected` after an `UPDATE` or `DELETE`.
- [ ] **SQL Errors**: Explicitly handle Constraint Violations, Deadlocks, and Serialization Errors.
- [ ] **Unique Indexes**: Use them for all business-critical unique fields, not just the primary key.
- [ ] **Short Transactions**: Keep locks for as short a time as possible.
- [ ] **Idempotency**: Ensure retrying the same operation doesn't cause side effects or permanent errors.

---

## 6. Deep Dive: Expert SQL Knowledge

### MVCC and System Columns
Modern databases use **Multi-Version Concurrency Control (MVCC)** to handle concurrent access without locking for every read. In PostgreSQL, every row has hidden system columns:
- **`xmin`**: The ID of the transaction that inserted the row.
- **`xmax`**: The ID of the transaction that deleted or updated the row (initially `0`).
Understanding these helps explain how the database "sees" different versions of data at different isolation levels.

### Advisory Locks
Sometimes you need to lock a "logical" resource that doesn't correspond to a specific database row.
- **PostgreSQL**: `SELECT pg_advisory_lock(123);` (Locks are session-level or transaction-level).
- **MySQL**: `SELECT GET_LOCK('my_resource', 10);` (Global locks with a timeout).
**Warning**: Use these sparingly. It's usually better to lock an actual row in a table.

### Stored Procedures vs. Application Logic
The workshop highlights a common debate:
- **Keep it in DB**: Using triggers or stored procedures ensures consistency even if different applications access the same DB.
- **Keep it in Code (Recommended)**: Business logic in the DB is hard to version control, hard to test, and easy to forget during migrations. The recommended approach is to use the DB for **Schema Enforcement** (Types, Unique Indexes, CHECK constraints) and keep business rules in the application layer.

---

## 7. System Design Checklist

When designing a feature that involves shared resources or limits:
1.  **Concurrency**: Is there concurrent access to the same entity from different users?
2.  **Fraud/Abuse**: Can a user try to "double-dip" by clicking a button from multiple devices simultaneously?
3.  **Consistency Level**: Do you need **Strong Consistency** (e.g., money, limits) or is **Eventual Consistency** acceptable?
4.  **Idempotency**: Is your API idempotent? What happens if the same request is retried after a network timeout?
5.  **Failure Modes**: What happens if the connection drops *after* the DB commit but *before* the client receives the response?
