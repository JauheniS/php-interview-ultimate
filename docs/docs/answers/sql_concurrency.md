# SQL Literacy: Isolation, Locking, and Idempotency

Building robust, high-traffic backend applications requires a deep understanding of how databases handle concurrent access. This guide explores common scenarios, pitfalls, and expert-level strategies for ensuring data integrity and performance.

---

## 1. Case Study: Update Race Conditions (The "Last Update Wins" Bug)

### Scenario
A system where multiple users can modify the same resource simultaneously, such as a "Meetup Slot" reservation.

**Naive Implementation:**
```php
$slot = $db->query("SELECT * FROM meetup_slots WHERE id = 1")->fetch();
if ($slot->speaker_id === null) {
    $db->query("UPDATE meetup_slots SET speaker_id = $userId WHERE id = 1");
}
```

**Problem:** Two users read `speaker_id IS NULL` at the same time. Both execute the `UPDATE`. The second user overwrites the first (Lost Update).

### Solutions:
1.  **Pessimistic Locking (`SELECT FOR UPDATE`)**:
    Locks the row until the transaction commits. Other transactions will block at the `SELECT` step.
    *   **`NOWAIT`**: If you want to fail immediately instead of waiting for a lock:
        `SELECT * FROM meetup_slots WHERE id = 1 FOR UPDATE NOWAIT;`
    *   **`SKIP LOCKED`**: Perfect for queues. It skips rows already locked by others:
        `SELECT * FROM jobs WHERE status = 'pending' LIMIT 1 FOR UPDATE SKIP LOCKED;`

2.  **Atomic Updates (Recommended)**:
    Combine the check and the update into a single SQL statement:
    ```sql
    UPDATE meetup_slots 
    SET speaker_id = :user_id 
    WHERE id = :id AND speaker_id IS NULL;
    ```
    Always check the number of **Rows Affected**. If it's `0`, the operation failed because the condition was no longer met.

---

## 2. Case Study: Idempotency (Handling Retries)

### Scenario
An API endpoint for adding a visitor to a meetup. Due to network failures or "at-least-once" delivery (Kafka), the same request might be sent multiple times.

**Problem:** The same user might be added multiple times, potentially occupying multiple seats.

### Solution:
1.  **Unique Constraints**: Create a unique index on `(meetup_id, user_id)`.
2.  **Error Handling**:
    Catch the "Duplicate Key" error. If a retry happens, the DB blocks the second insert. Treat this as a success (or "Already Done") to ensure the client sees a consistent result.

---

## 3. Case Study: Limit Management (Aggregate Counts)

### Scenario
Ensuring a meetup doesn't exceed a seat limit (e.g., 100 seats).

**Naive Implementation:**
```sql
SELECT COUNT(*) FROM visitors WHERE meetup_id = 1; -- Returns 99
-- ... if count < limit, then ...
INSERT INTO visitors (meetup_id, user_id) VALUES (1, 101);
```

**Problem:** Parallel transactions might both see `99` and both insert, leading to `101` visitors.

### Solutions:
1.  **Lock the Parent Row**:
    `SELECT * FROM meetups WHERE id = 1 FOR UPDATE;`
    This serializes all registrations for *this specific meetup*.
2.  **Counter Denormalization + CHECK Constraint**:
    Add a `booked_seats` column to the `meetups` table and a `CHECK (booked_seats <= total_seats)`.
    Update the counter in the same transaction as the insert:
    ```sql
    UPDATE meetups SET booked_seats = booked_seats + 1 WHERE id = 1;
    ```
    The DB enforces the `CHECK` constraint across all transactions.

---

## 4. Distributed Locking (Redis vs. SQL)

### When to use Redis:
-   **Rate Limiting**: Preventing floods from overwhelming the database.
-   **Circuit Breakers**: Temporarily blocking access to struggling resources.
-   **Task Synchronization**: Ensuring a cron job runs once across multiple nodes.

### When to avoid Redis for Data Consistency:
If the consistency requirement is strictly within the database, use SQL features.
-   **No Cross-System Atomicity**: You cannot atomically commit a Redis key and a SQL row.
-   **TTL Risks**: A Redis lock might expire while the DB transaction is still running.

---

## 5. Deep Dive: MVCC (Multi-Version Concurrency Control)

Databases handle concurrency by keeping multiple versions of a row. This allows one transaction to read data while another is updating it without blocking.

### PostgreSQL
Postgres stores all versions directly in the table (heap). Every row has hidden system columns:
- **`xmin`**: The ID of the transaction that inserted the row.
- **`xmax`**: The ID of the transaction that deleted or updated the row.
- **`ctid`**: The physical location of the row version on disk.

### MySQL (InnoDB)
MySQL stores only the latest version in the table and moves historical data to the **Undo Log**:
- **`DB_TRX_ID`**: The ID of the last transaction that inserted or updated the row.
- **`DB_ROLL_PTR`**: A pointer to the previous version in the Undo Log.
- **`DB_ROW_ID`**: A hidden row ID used if the table has no primary key.

### Row-Level Lock Modes (PostgreSQL)
Postgres provides fine-grained control over how you lock a row:
- **`FOR UPDATE`**: Full exclusive lock. Prevents any other lock.
- **`FOR NO KEY UPDATE`**: Prevents `FOR UPDATE` and other `FOR NO KEY UPDATE` locks, but allows `FOR KEY SHARE`. Used when you update columns that are NOT part of a unique index.
- **`FOR SHARE`**: Shared lock. Allows others to read (`FOR SHARE`), but prevents modifications (`FOR UPDATE`).
- **`FOR KEY SHARE`**: Weakest lock. Allows `FOR NO KEY UPDATE`.

### Advisory Locks
Advisory locks are logical locks that the database doesn't enforce automatically—your application must check them.
- **Session-level**: `SELECT pg_advisory_lock(123);` lasts until the session ends or `pg_advisory_unlock` is called.
- **Transaction-level**: `SELECT pg_advisory_xact_lock(123);` automatically releases at the end of the current transaction (`COMMIT` or `ROLLBACK`). This is extremely useful for synchronizing high-level application logic within DB transactions.

---

## 6. Developer Checklist

- [ ] **Rows Affected**: Always check `rows_affected` after an `UPDATE` or `DELETE`.
- [ ] **SQL Errors**: Handle Constraint Violations, Deadlocks, and Serialization Errors.
- [ ] **Wait Behavior**: Use `NOWAIT` for interactive UI actions and `SKIP LOCKED` for background workers.
- [ ] **Short Transactions**: Hold locks for the minimum time necessary.
- [ ] **Idempotency**: Ensure retries are safe and return the same final state.

---

## 7. System Design Checklist

1.  **Concurrency**: Is there concurrent access to the same entity from different users?
2.  **Fraud/Abuse**: Can a user "double-dip" using multiple devices?
3.  **Consistency Level**: Is **Strong Consistency** required, or is **Eventual Consistency** acceptable?
4.  **Idempotency**: Is the API idempotent? 
5.  **Failure Modes**: What happens if the connection drops between DB commit and client response?
