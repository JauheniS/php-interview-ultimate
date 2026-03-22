---
title: "Advanced MySQL Concepts"
slug: "/answers/mysql_advanced"
---

# Advanced MySQL Concepts

## 1. Storage Engines: InnoDB vs MyISAM
- **InnoDB**:
    - Supports **Transactions** (ACID compliant).
    - **Row-level locking** (better for concurrent writes).
    - Supports **Foreign Keys**.
    - Data is stored in a clustered index (B+Tree).
    - Better crash recovery.
- **MyISAM**:
    - No transaction support.
    - **Table-level locking** (slow for concurrent writes).
    - No foreign keys.
    - Can be faster for read-heavy workloads with very few writes.
    - Supports Full-text searching (InnoDB also supports it since 5.6).

## 2. Indices Types
- **B-Tree Index**: The most common type. Good for range searches and exact matches.
- **Hash Index**: Very fast for exact matches, but can't be used for range searches.
- **Full-text Index**: Used for searching text within large columns.
- **Spatial Index**: Used for geographical data (R-trees).

## 3. ACID Properties
- **Atomicity**: "All or nothing". Ensures that all operations within a transaction are completed; if any operation fails, the entire transaction is rolled back to its previous state.
- **Consistency**: Data must follow all database rules (constraints, triggers, etc.). Ensures that a transaction transforms the database from one valid state to another.
- **Isolation**: Each transaction is independent. Prevents concurrent transactions from interfering with each other, ensuring that the intermediate state of one transaction is invisible to others.
- **Durability**: Committed data is saved permanently. Once a transaction is committed, its changes survive even in the event of a system failure.

## 4. Transaction Control Commands
- `START TRANSACTION` or `BEGIN`: Marks the beginning of a transaction block.
- `COMMIT`: Saves all changes made during the current transaction, making them permanent and visible to other users.
- `ROLLBACK`: Reverts all changes made during the current transaction, returning the database to its state before the transaction began.
- `SAVEPOINT name`: Creates a point within a transaction that can be rolled back to later without affecting the entire transaction.
- `ROLLBACK TO name`: Reverts the transaction to the specified savepoint.
- `RELEASE SAVEPOINT name`: Removes a savepoint from the current transaction.

### Autocommit Mode
By default, MySQL runs with **autocommit** mode enabled. This means that as soon as you execute a statement that updates (modifies) a table, MySQL stores the update on disk to make it permanent. To group multiple statements into a single transaction, you must either:
1. Use `START TRANSACTION;`
2. Set autocommit to off: `SET autocommit = 0;`

## 5. Transaction Isolation Levels
- **Read Uncommitted**: Can see data from other transactions that haven't been committed yet ("Dirty Reads").
- **Read Committed**: Can only see committed data.
- **Repeatable Read**: Ensures that if you read a row twice in the same transaction, you get the same data (default for InnoDB).
- **Serializable**: Highest isolation level; transactions are executed as if they were sequential.

## 6. Locking and Concurrency
- **Pessimistic Locking**: Assumes a conflict will occur and locks the row/table before modifying it (`SELECT ... FOR UPDATE`).
- **Optimistic Locking**: Assumes no conflict; checks if the data has changed since it was read (usually via a version/timestamp column) before updating.
- **Advisory Locks**: Application-defined locks (e.g., `GET_LOCK('my_lock_name', 10)`) that don't lock database rows but provide a way to synchronize logic across different processes.
- **Deadlock**: A situation where two or more transactions are waiting for each other to release locks, causing a permanent block. MySQL automatically detects deadlocks and rolls back one of the transactions to break the cycle.

## 7. Practical Database Management
- **Selectivity**: The ratio of unique values in a column to the total number of records. Higher selectivity means an index on that column will be more effective.
- **ANALYZE vs EXPLAIN**:
  - `EXPLAIN`: Shows the execution plan *without* actually running the query.
  - `ANALYZE TABLE`: Updates statistics for the table to help the optimizer make better decisions. `EXPLAIN ANALYZE` (MySQL 8.0.18+) *runs* the query and provides real-time profiling.
- **CHAR vs VARCHAR**: `CHAR` is fixed-length (padded with spaces), while `VARCHAR` is variable-length. `CHAR` is slightly faster for very short, uniform data (like country codes), while `VARCHAR` saves space for varying text lengths.
- **ALTER TABLE on Live Tables**: For large tables (millions of rows), `ALTER TABLE` can lock the table and cause downtime. Solutions:
  - **pt-online-schema-change**: A tool from Percona that creates a shadow table, syncs data via triggers, and swaps them.
  - **Ghost (GitHub Online Schema Migrations)**: Migrates schemas without triggers by tailing the binary log.
  - **Online DDL**: Since MySQL 5.6+, many `ALTER TABLE` operations can be performed without locking the table for writes.

## 8. Performance Tuning
- **EXPLAIN**: Use this command to see how MySQL executes your query and if it uses indices.
- **Slow Query Log**: Identify queries that take a long time to execute.
- **Query Caching**: (Deprecated in 5.7, removed in 8.0). Use application-level caching (Redis/Memcached) instead.
- **Connection Pooling**: Reusing database connections to reduce overhead.
