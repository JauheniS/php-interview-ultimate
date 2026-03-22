---
title: "Architecture & Highload: Scalability, Microservices, and Performance"
slug: "/answers/architecture_highload"
---

# Architecture & Highload: Scalability, Microservices, and Performance

When applications grow, they face challenges related to performance, scalability, and maintainability.

## 1. Monolith vs Microservices
- **Monolith**: A single application where all business logic is tightly integrated.
    - **Pros**: Easy to develop, test, and deploy (initially); simple horizontal scaling (the whole app is duplicated); lower network latency (all components are in the same memory space).
    - **Cons**: Difficult to scale individual parts; long build/deploy times; code complexity; a single point of failure can bring down the entire app.
- **Microservices**: An approach where a single application is composed of many smaller, loosely coupled and independently deployable services.
    - **Pros**:
        - **Independent Scaling**: Components can be scaled independently, optimizing usage and costs.
        - **Speed and Agility**: Easier to update and add new features without affecting the whole application.
        - **Technology Independence**: Teams can choose the stack best suited for each service's specific job.
        - **Fault Isolation**: Problems in one service are less likely to bring down the entire system, leading to better resilience.
    - **Cons**: High operational management complexity; data consistency issues (distributed transactions); network latency and connectivity risks; more voluminous and complex logging/monitoring.

### Microservices vs SOA (Service-Oriented Architecture)
While both decompose applications into services, they differ in scope and communication:
- **SOA**: An enterprise-wide effort to standardize how all web services in an organization integrate, often using an **Enterprise Service Bus (ESB)**.
- **Microservices**: Application-specific architecture focusing on small, independent services communicating via lightweight mechanisms (REST, gRPC, Message Queues).

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

## 9. Key Enabling Technologies for Microservices
- **Containers (Docker)**: Provide a lightweight and consistent environment for services to run in, ensuring they behave the same across different environments.
- **Orchestration (Kubernetes)**: Manages the deployment, scaling, and operation of application containers across clusters of hosts.
- **API Gateways**: Act as a single entry point for all client requests, handling routing, authentication, and load balancing.

## 10. Service Discovery & Patterns
- **Service Discovery**: Allows services to find and communicate with each other dynamically as instances scale up, down, or fail. This often uses health checks and triggers load balancing to rebalance traffic.
- **Backend-for-frontend (BFF)**: A pattern where a separate backend service is created for each specific frontend (e.g., mobile, web) to optimize the data and performance for that client.
- **Adapter Patterns**: Used to bridge communication between different services or legacy systems.
