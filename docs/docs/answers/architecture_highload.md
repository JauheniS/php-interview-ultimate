---
title: "Architecture & Highload: Scalability, Microservices, and Performance"
slug: "/answers/architecture_highload"
---

# Architecture & Highload: Scalability, Microservices, and Performance

When applications grow, they face challenges related to performance, scalability, and maintainability.

## 1. Monolith vs Microservices
- **Monolith**: A single application where all business logic is tightly integrated.
    - **Pros**: Easy to develop, test, and deploy (initially).
    - **Cons**: Difficult to scale individual parts; long build/deploy times; code complexity.
- **Microservices**: A system of small, independent services that communicate via network (APIs, Message Queues).
    - **Pros**: Individual services can be scaled, updated, and written in different languages. Fault isolation.
    - **Cons**: High operational complexity; data consistency issues; network latency.

## 2. Scalability Strategies
- **Vertical Scaling**: Adding more resources (CPU, RAM) to a single server.
- **Horizontal Scaling**: Adding more servers and distributing the load (Load Balancing).

## 3. Database Scalability
- **Read/Write Splitting**: One Master database (Writes) and multiple Replicas (Reads).
- **Partitioning**: Splitting a large table into smaller parts within the same database instance.
- **Sharding**: Distributing data across multiple physical database servers.
    - **Vertical Sharding**: Putting different tables in different databases.
    - **Horizontal Sharding**: Splitting rows of a single table across multiple databases based on a shard key.

## 4. Architectural Patterns
- **CQRS (Command Query Responsibility Segregation)**: Separates the models for writing data (Commands) and reading data (Queries).
- **Event Sourcing**: Instead of storing the current state, store all changes as a sequence of events.
- **API Gateway**: A single entry point for all microservices, handling routing, authentication, and load balancing.
- **Circuit Breaker**: Prevents a failing service from causing a cascade of failures across the system.

## 5. CAP Theorem
In a distributed system, you can only provide two of the following three guarantees:
- **Consistency**: All nodes see the same data at the same time.
- **Availability**: Every request receives a response (success or failure).
- **Partition Tolerance**: The system continues to operate despite network failures.

## 6. Highload & Database Performance
- **PHP-FPM & Nginx**: Nginx acts as a reverse proxy, passing PHP requests to the PHP-FPM pool via a Unix socket or TCP.
- **Optimizing Single Inserts in Big Tables**:
  - Use **Bulk Inserts** (`INSERT INTO ... VALUES (), (), ...`).
  - Disable indices during the insert (if possible) and rebuild them after.
  - Use `LOAD DATA INFILE` for massive datasets.
  - Disable `autocommit` or use transactions.
- **Tools for Database Profiling**: `EXPLAIN`, `SHOW PROFILE`, `Slow Query Log`, `Performance Schema`, `Percona Toolkit`.
- **Narrowing PHP Performance Problems**: `Xhprof`, `Blackfire.io`, `New Relic`, `Tideways`.
- **Handling Deadlocks**: Keep transactions short, access tables in the same order, use retry logic, use lower isolation levels if acceptable.

## 7. Tricky Performance Question
### Scenario: A GET endpoint times out reading from a large table. How to optimize it WITHOUT changing the response body?
- **Answer**:
  1. **Add/Optimize Indices**: Ensure the query uses a covered index (index that contains all columns in the SELECT).
  2. **Pagination**: Implement cursor-based pagination (even if the "body" doesn't change, the *fetching* should be limited).
  3. **Materialized View/Cache**: Pre-calculate the result and store it in a separate table or Redis.
  4. **Denormalization**: Add the necessary columns to the main table to avoid expensive JOINs.
  5. **Vertical/Horizontal Sharding**: Move the data to faster disks or split it across servers.
  6. **Read Replicas**: Offload the read request from the master database.

## 8. Highload Performance (PHP-specific)
- **PHP-FPM**: Uses a pool of worker processes to handle incoming requests from a web server (Nginx/Apache).
- **OPCache**: Stores precompiled bytecode to avoid parsing scripts on every request.
- **JIT (Just-In-Time)**: Available in PHP 8+, translates bytecode into machine code for certain tasks.
- **Swoole / RoadRunner**: Alternatives to PHP-FPM that keep the application in memory between requests (like Node.js or Go).
- **Queueing**: Use tools like RabbitMQ, Kafka, or Redis to offload time-consuming tasks (sending emails, processing images) to background workers.
