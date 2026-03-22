---
title: "Infrastructure & Tools (RabbitMQ, Redis, Docker)"
slug: "/answers/infrastructure_extras"
---

# Infrastructure & Tools (RabbitMQ, Redis, Docker)

## RabbitMQ & AMQP
RabbitMQ is a message broker that uses the **AMQP 0-9-1** protocol.
- **Message Lifecycle**: Producer -> Exchange -> Queue -> Consumer.
- **Exchange Types**:
  - `Direct`: Matches messages by exact routing key.
  - `Topic`: Matches messages by pattern (using `*` and `#`).
  - `Fanout`: Forwards messages to all queues bound to it.
  - `Headers`: Uses message headers instead of routing keys.
- **Ack/Nack**:
  - `Ack` (Acknowledge): Consumer tells RabbitMQ it processed the message (delete it).
  - `Nack` (Negative Acknowledge): Consumer tells RabbitMQ something went wrong (can requeue or drop).
- **Durable vs Persistent**: A **Durable** queue survives a broker restart. **Persistent** messages are saved to disk (if the queue is also durable).
- **Pull vs Push**: RabbitMQ typically uses a **Push** model (broker pushes to consumers), but consumers can also **Pull** using `basic.get`.

---

## Redis Features
Redis is an in-memory data store used as a database, cache, and message broker.
- **Basic Data Types**: String, List, Set, Sorted Set, Hash.
- **Complex Data Types**: Bitmaps, HyperLogLogs, Geospatial, Streams.
- **Pub/Sub**: Redis can act as a lightweight message broker where publishers send messages to channels and subscribers listen to them (fire-and-forget).
- **Security**: Redis is designed for internal use. It should only be accessible on trusted networks. Security measures include:
  - `requirepass`: Authentication.
  - `rename-command`: Disabling or renaming dangerous commands (like `FLUSHALL`).
  - `bind`: Restricting access to specific IP addresses.

---

## Docker & DevOps

### ENV vs ARG
- **ARG**: Used only during the **build** phase of the image. It is not available in the running container.
- **ENV**: Used both during the **build** and at **runtime**. It persists in the container environment.

### Docker Volumes
- **Anonymous Volume**: Managed by Docker, hard to find (e.g., `/var/lib/docker/volumes/...`).
- **Named Volume**: Easier to manage and reuse across containers.
- **Bind Mount**: Maps a specific host directory to a container directory (best for development).

### Performance of DB in Docker
Running a database in Docker can have performance overhead, especially on **macOS/Windows** (due to the VM/file system synchronization overhead). On **Linux**, it is almost native speed, but volumes are still necessary to persist data.

### CI/CD (Continuous Integration / Continuous Deployment)
- **Continuous Integration (CI)**: Merging code frequently into the main branch and running automated tests.
- **Continuous Delivery (CD)**: Automatically preparing the code for release, but the final deployment is manual.
- **Continuous Deployment (CD)**: Every change that passes automated tests is automatically deployed to production.
