---
title: "RoadRunner: High-Performance PHP"
slug: "/answers/roadrunner"
---

# RoadRunner: High-Performance PHP

RoadRunner is a high-performance PHP application server, load-balancer, and process manager written in Go. It operates as a persistent process that manages a pool of PHP workers, eliminating the overhead of bootstrapping the PHP engine and application framework for every request.

## Core Architecture

### Goridge Protocol
RoadRunner uses a high-performance binary protocol called **Goridge** to communicate between the Go server and PHP workers. Goridge supports various communication channels:
- **Pipes (Standard):** Fast and requires no additional configuration.
- **TCP Sockets:** Allows PHP workers to run on different machines or containers.
- **Unix Sockets:** High-performance local communication.

### Worker Pool
RoadRunner maintains a pool of workers. Each worker is a separate PHP process that stays alive after processing a request. This means your application (Laravel, Symfony, etc.) only boots once.

#### Pool Configuration (`.rr.yaml`)
Key parameters for managing worker lifecycles:
- `num_workers`: Number of worker processes to start.
- `max_jobs`: Number of requests a worker handles before being automatically killed and replaced (prevents memory leaks).
- `max_memory`: Soft memory limit; worker is replaced after the request if the limit is exceeded.
- `ttl`: Maximum time a worker can live.
- `idle_ttl`: Maximum time a worker can stay idle.
- `pool.debug`: If set to `true`, a new worker is spawned for every request (useful for development).

## PHP Worker Implementation

A typical PHP worker uses the `Spiral\RoadRunner\Worker` class. It runs in an infinite loop:

```php
use Spiral\RoadRunner\Worker;
use Nyholm\Psr7\Factory\Psr17Factory;
use Spiral\RoadRunner\Http\HttpWorker;

$worker = Worker::create();
$factory = new Psr17Factory();
$httpWorker = new HttpWorker($worker, $factory, $factory, $factory);

while ($request = $httpWorker->waitRequest()) {
    try {
        $response = $factory->createResponse(200)->withBody($factory->createStream('Hello RoadRunner!'));
        $httpWorker->respond($response);
    } catch (\Throwable $e) {
        $httpWorker->getWorker()->error((string)$e);
    }
}
```

## Key Plugins

### HTTP Plugin
- **Middleware:** Support for Go-level middleware (headers, compression, static files).
- **Response Streaming:** Allows sending large payloads incrementally to the client.
- **SSL/TLS:** Built-in support for HTTPS and HTTP/2.

### Key-Value (KV) Plugin
Provides a unified interface for caching and state management across workers.
- **Drivers:** `redis`, `memcached`, `boltdb` (file), `memory`.

### Jobs (Queues) Plugin
Centralized job consumption and management within the Go process.
- **Drivers:** `amqp`, `beanstalk`, `redis`, `sqs`, `nats`, `boltdb`, `memory`.

### Service Plugin
Allows running any binary or script as a "sidecar" process (e.g., a custom Go daemon or a Python script) and ensures it stays alive.

### Locks Plugin
Provides distributed locking to synchronize access to shared resources across multiple workers or RoadRunner instances.

## Best Practices for Long-Running PHP

### 1. Memory Management
PHP wasn't originally designed for long-running processes. Even if your code is clean, third-party libraries might leak memory. Always set `max_jobs` or `max_memory` in the pool configuration.

### 2. Resetting State
Static variables and singleton instances (like in Laravel's Service Container) persist across requests. You must manually reset or rebind services that hold request-specific data.

### 3. Database Connections
Connections might time out if they stay idle for too long. Ensure your database client handles re-connections or use the RoadRunner `ttl` settings to refresh workers.

### 4. Output Buffering
Avoid using `echo` or `print` directly; they might corrupt the binary protocol. Use PSR-7 response objects. RoadRunner 2.0+ automatically redirects `STDOUT` to `STDERR` to mitigate this.

## Monitoring & Health Checks

The `status` plugin provides monitoring capabilities:
- `/health`: Liveness probe (is the RR server up?).
- `/ready`: Readiness probe (is there at least one free worker available to handle requests?).

These are typically integrated with Kubernetes or other orchestrators for automated scaling and health management.

## Temporal Integration
RoadRunner is the primary PHP worker for **Temporal**, an open-source orchestration engine for stateful, long-running workflows. This allows building complex distributed systems using standard PHP logic.
