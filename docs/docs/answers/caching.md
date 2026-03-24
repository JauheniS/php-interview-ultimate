---
title: 'Caching: Redis vs Memcached in PHP'
slug: '/answers/caching'
---

# Caching: Redis vs Memcached in PHP

Caching is a technique used to store data in high-speed storage (usually RAM) to reduce the time it takes to access that data in the future.

## 1. Memcached

Memcached is a high-performance, distributed memory object caching system.

### Pros:

- **Simplicity**: Easy to set up and use.
- **Multi-threaded**: Can take advantage of multi-core processors.
- **Speed**: Extremely fast for simple key-value pairs.
- **Memory Efficiency**: Low overhead for storing small values.

### Cons:

- **Single Data Type**: Only supports strings. Complex data (arrays, objects) must be serialized/deserialized manually or by the PHP extension.
- **No Persistence**: Data is lost if the server restarts or runs out of memory (LRU eviction).
- **Size Limit**: Default key size limit is 250 bytes; value size limit is 1MB.

## 2. Redis

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store, used as a database, cache, and message broker.

### Pros:

- **Multiple Data Structures**: Supports strings, lists, hashes, sets, sorted sets, bitmaps, hyperloglogs, and geospatial indexes.
- **Persistence**: Can save data to disk (RDB snapshots or AOF logs).
- **Atomic Operations**: Supports complex operations like incrementing a hash field or pushing to a list.
- **Pub/Sub**: Built-in support for messaging.
- **High Availability**: Supports replication, Sentinel, and Cluster.

### Cons:

- **Single-threaded**: Core operations are single-threaded (though modern versions use multiple threads for I/O).
- **Complexity**: More configuration options and features can lead to a steeper learning curve.
- **Memory Overhead**: Uses more RAM than Memcached for the same amount of data due to metadata.

## 3. Which one to choose?

- **Choose Memcached** if you need a simple, fast key-value cache and want to scale across multiple cores easily.
- **Choose Redis** if you need complex data types, persistence, or advanced features like Pub/Sub or atomic operations.

## 4. PHP Extensions

- **Memcache/Memcached**: The `memcache` extension is older; `memcached` (with a 'd') is newer and uses the `libmemcached` library.
- **PhpRedis**: A native PHP extension written in C for high performance.
- **Predis**: A flexible and feature-complete Redis client library for PHP, written in PHP (no extension required).
