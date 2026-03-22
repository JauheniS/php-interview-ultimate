---
title: "PHP Reflection and SPL"
slug: "/answers/php_advanced_extras"
---

# PHP Reflection and SPL

## Reflection API
The PHP Reflection API allows you to inspect classes, interfaces, functions, methods, and extensions. It's essentially "reverse engineering" code from within PHP. It is widely used in dependency injection containers, ORMs (like Doctrine), and testing frameworks to understand classes and their properties without manually configuring them.

### Common Reflection Classes
- `ReflectionClass`: Information about a class.
- `ReflectionMethod`: Information about a class method.
- `ReflectionProperty`: Information about a class property.
- `ReflectionFunction`: Information about a function.
- `ReflectionParameter`: Information about a function/method parameter.

### Example: Getting Private Properties
```php
class User {
    private string $name = "John Doe";
}

$reflector = new ReflectionClass('User');
$property = $reflector->getProperty('name');
$property->setAccessible(true); // Since PHP 8.1, properties are automatically accessible via Reflection

$user = new User();
echo $property->getValue($user); // John Doe
```

---

## Standard PHP Library (SPL)
The SPL is a collection of interfaces and classes that are designed to solve common problems. It provides a standard way to implement common patterns such as iterators, data structures, and observers.

### Main Components of SPL
1. **Iterators**: Classes to iterate over objects, directories, files, or complex structures.
   - `ArrayIterator`, `DirectoryIterator`, `FilterIterator`, `RecursiveIteratorIterator`.
2. **Data Structures**: Optimized classes for specific data storage.
   - `SplStack`, `SplQueue`, `SplHeap`, `SplPriorityQueue`, `SplFixedArray` (faster than regular arrays for large datasets), `SplObjectStorage` (map for objects).
3. **Exceptions**: Standard exception classes like `LogicException`, `RuntimeException`, `InvalidArgumentException`.
4. **Interfaces**: `Countable` (allows `count()`), `Serializable`, `SplObserver`, `SplSubject`.

### Difference between SplFixedArray and Array
A standard PHP `array` is actually an ordered map (hash table). `SplFixedArray` is a real C-style array with fixed size and integer indices, making it faster and more memory-efficient for large, numerically-indexed data sets.

---

## PHP as a Daemon (Swoole, Roadrunner)
Modern PHP is no longer limited to the "request-response" lifecycle (where the script starts and dies for every request). Using tools like Swoole, Roadrunner, or Workerman, PHP can run as a long-lived process (daemon).

### Benefits
- **Performance**: Bootstrapping (loading the framework, config, DIC) happens once at startup, not on every request.
- **State persistence**: Database connections, caches, and objects can stay in memory between requests.
- **Asynchronous tasks**: Built-in support for non-blocking I/O, timers, and background tasks.

### Risks and Challenges
1. **Memory Leaks**: Since the process stays alive, any memory not properly cleared (e.g., static variables, global arrays) will accumulate, eventually crashing the process.
2. **Global State**: Global variables or static properties carry over between requests, potentially causing "state contamination" (user A's data showing up for user B).
3. **Zombies/Resources**: Open file handles or database connections might stay open too long or hang if not managed correctly.
4. **Error Handling**: A fatal error can crash the entire server worker, not just one request.
5. **Code Updates**: Changes to the code require a full restart of the daemon to take effect (no "hot reload" by default).

---

## Persistent Database Connections
PHP provides a mechanism for persistent database connections (e.g., `PDO::ATTR_PERSISTENT => true`).

### Pros
- Reduces the overhead of establishing a new TCP connection and handshake for every request.
- Improves performance in high-concurrency environments.

### Cons
- **Connection Exhaustion**: Since connections are not closed when the script ends, they stay in the connection pool. If not managed properly, you might exceed the database's `max_connections` limit.
- **Stale State**: Temporary tables, session variables, or transaction states might persist to the next request using the same connection.
- **Deadlocks**: Long-running transactions on persistent connections can cause issues if not carefully closed.
