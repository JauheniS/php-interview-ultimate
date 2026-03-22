# Ultimate PHP Interview Questions & Answers

This file contains a curated list of PHP interview questions and answers, merged from multiple sources and categorized by level (Junior, Middle, Senior).

## Table of Contents
1. [PHP Basics & Language Features](#1-php-basics--language-features)
2. [Object-Oriented Programming (OOP)](#2-object-oriented-programming-oop)
3. [PHP 7/8+ New Features](#3-php-78-new-features)
4. [MySQL & Databases](#4-mysql--databases)
5. [Laravel & Symfony](#5-laravel--symfony)
6. [Tools & Composer](#6-tools--composer)
7. [Design Patterns & Architecture](#7-design-patterns--architecture)
8. [Caching & Redis](#8-caching--redis)
9. [Infrastructure, Docker & DevOps](#9-infrastructure-docker--devops)
10. [Testing & Quality](#10-testing--quality)
11. [Security](#11-security)
12. [Web & API](#12-web--api)
13. [Highload & Scalability](#13-highload--scalability)
14. [Clean Code & Best Practices](#14-clean-code--best-practices)
15. [Elasticsearch](#15-elasticsearch)
16. [Tricky Questions](#16-tricky-questions)
17. [Laravel Plugins](#17-laravel-plugins)

---

## 1. PHP Basics & Language Features

### Junior
#### What does PHP stand for and what is its main purpose?
**Answer:** PHP originally stood for "Personal Home Page," but it now stands for "PHP: Hypertext Preprocessor." It is a server-side scripting language designed for web development. Its main purpose is to generate dynamic web content, handle form data, interact with databases, manage sessions, and more.

#### Is PHP a case-sensitive language?
**Answer:** Yes, PHP is case-sensitive for variable names. However, function names, class names, and built-in constructs (like `echo`, `if`, etc.) are case-insensitive.

#### What are the rules for naming a PHP variable?
**Answer:** 
- Must start with a `$` sign.
- Followed by a letter or underscore.
- Can only contain letters, numbers, and underscores (A-z, 0-9, and _).
- Cannot start with a number.
- Variable names are case-sensitive.

#### What are the data types in PHP?
**Answer:** 
- **Scalar:** `int`, `float`, `string`, `bool`.
- **Compound:** `array`, `object`, `callable`, `iterable`.
- **Special:** `resource`, `null`.
[Detailed Data Types Guide](answers/data_types.md)

#### What is the difference between `empty()`, `is_null()`, and `isset()`?
**Answer:** 
- `empty()`: Returns true if the variable is an empty string, 0, false, null, or an empty array.
- `is_null()`: Returns true only if the variable is null.
- `isset()`: Returns true if the variable is set and is not null.

#### What is the difference between `echo` and `print`?
**Answer:** 
- `echo` is a language construct, while `print` is a function (though it behaves like a construct).
- `echo` is slightly faster and can take multiple parameters.
- `print` always returns 1, so it can be used in expressions.

#### What are `include()`, `require()`, `include_once()`, and `require_once()`?
**Answer:** 
- `include()`: Includes a file. If it fails, it emits a warning and continues.
- `require()`: Includes a file. If it fails, it emits a fatal error and stops execution.
- `*_once()`: Similar to their counterparts, but ensure the file is only included once.

#### What are the different types of arrays in PHP?
**Answer:** 
- **Indexed arrays:** Arrays with a numeric index.
- **Associative arrays:** Arrays with named keys.
- **Multidimensional arrays:** Arrays containing one or more arrays.

#### What is the difference between single-quoted and double-quoted strings?
**Answer:** 
- **Single-quoted:** Literals. Variables and most escape sequences are not interpreted.
- **Double-quoted:** Variables are interpolated, and escape sequences (like `\n`, `\t`) are interpreted.

#### What is the difference between `$message` and `$$message`?
**Answer:** `$message` is a regular variable. `$$message` is a "variable variable," which uses the value of `$message` as the name of another variable.

#### What is meant by "escaping to PHP"?
**Answer:** It refers to embedding PHP code within HTML using tags like `<?php ... ?>`.

#### What are the rules to determine the "truth" of any value (truthiness)?
**Answer:** In PHP, values are "truthy" unless they are: `null`, `false`, `0`, `0.0`, `""` (empty string), `"0"`, or `[]` (empty array).

#### What is the difference between constants and variables?
**Answer:** Constants are defined using `define()` or `const` and cannot be changed or undefined once set. Variables can change their value at any time.

#### Name some built-in constants in PHP.
**Answer:** `PHP_VERSION`, `PHP_OS`, `DEFAULT_INCLUDE_PATH`, `DIRECTORY_SEPARATOR`, `E_ERROR`, `E_WARNING`.

#### What is the use of `explode()` and `implode()`?
**Answer:** 
- `explode()`: Splits a string into an array by a delimiter.
- `implode()`: Joins array elements into a string using a delimiter.

#### What is the difference between `unset()` and `unlink()`?
**Answer:** 
- `unset()`: Destroys a variable or an element in an array.
- `unlink()`: Deletes a file from the server.

### Middle
#### What are Magic Constants in PHP?
**Answer:** Magic constants are predefined constants that change depending on where they are used.
- `__LINE__`, `__FILE__`, `__DIR__`, `__FUNCTION__`, `__CLASS__`, `__TRAIT__`, `__METHOD__`, `__NAMESPACE__`, `ClassName::class`.

#### What are Generators?
**Answer:** Generators provide an easy way to implement simple iterators using the `yield` keyword, allowing you to iterate through data without building an array in memory.
[Generators and yield](answers/generators.md)

#### What is the difference between a closure and an anonymous function?
**Answer:** An anonymous function is a function without a name. A closure is an anonymous function that can "close over" variables from its parent scope using the `use` keyword.

#### What is Type Hinting?
**Answer:** Type hinting allows you to specify the expected data type for function arguments and return values. This helps catch errors and improves code readability.

#### What is Garbage Collection in PHP?
**Answer:** PHP uses a reference counting mechanism and a cyclic garbage collector to automatically free memory occupied by objects and variables that are no longer reachable.

#### What is OPCache?
**Answer:** OPCache is a caching engine for PHP that stores precompiled script bytecode in shared memory, eliminating the need for PHP to load and parse scripts on each request.

#### How does Error Handling work in PHP?
**Answer:** PHP uses several mechanisms:
- **Error Reporting:** Configured via `error_reporting()` and `display_errors` in `php.ini`.
- **Try-Catch Blocks:** For handling `Exceptions` and `Errors` (since PHP 7).
- **Custom Error Handlers:** Using `set_error_handler()` and `set_exception_handler()`.

### Senior
#### What are the risks of using PHP as a long-lived process (daemon)?
**Answer:** Memory leaks and global state contamination are the biggest risks, as variables and objects persist between requests.
[Running PHP as a Daemon](answers/php_advanced_extras.md)

---

## 2. Object-Oriented Programming (OOP)

### Junior
#### What is a Class and an Object?
**Answer:** 
- **Class:** A blueprint or template for creating objects. It defines properties (attributes) and methods (behaviors).
- **Object:** An instance of a class. It is a concrete realization of the blueprint with its own state.

#### What are the main characteristics of OOP?
**Answer:** 
- **Encapsulation:** Bundling data and methods that operate on that data within a single unit (class) and restricting direct access.
- **Inheritance:** A mechanism where a subclass inherits properties and behaviors from a superclass.
- **Polymorphism:** The ability of different classes to be treated as instances of the same interface or parent class.
- **Abstraction:** Hiding complex implementation details and showing only the essential features of the object.

#### What are access modifiers in PHP?
**Answer:** 
- `public`: Accessible from anywhere.
- `protected`: Accessible within the class itself and by inheriting classes.
- `private`: Accessible only within the class that defines it.

#### What are constructors and destructors?
**Answer:** 
- `__construct()`: A special method called automatically when an object is instantiated.
- `__destruct()`: A special method called when an object is destroyed or the script ends.

### Middle
#### What is the difference between `this`, `self`, and `static`?
**Answer:** 
- `$this`: Refers to the current object instance.
- `self`: Refers to the current class. Used for static properties/methods.
- `static`: Refers to the called class (Late Static Binding).
[this vs self vs static](answers/this_self_static.md)

#### What is the difference between an Interface and an Abstract Class?
**Answer:** 
- **Interface:** Defines a contract. Can only have public methods and no implementation. A class can implement multiple interfaces.
- **Abstract Class:** Can have both abstract methods and concrete methods with implementation. A class can only extend one abstract class.
[Interface vs Abstract Class Comparison](answers/interface_vs_abstract.md)

#### What are Traits?
**Answer:** Traits are a mechanism for code reuse in single inheritance languages like PHP. They allow you to include sets of methods in several independent classes.

#### What is Method Overriding?
**Answer:** Method overriding occurs when a subclass provides a specific implementation for a method that is already defined in its parent class.

#### What are the different types of inheritance?
**Answer:** 
- **Single:** A class inherits from one parent class.
- **Multilevel:** A class inherits from a parent that is itself a subclass.
- **Hierarchical:** Multiple subclasses inherit from a single parent class.
- **Hybrid:** A combination of two or more of the above (using traits/interfaces).
*Note: PHP does not support Multiple Inheritance directly.*

#### What are Namespaces in PHP?
**Answer:** Namespaces provide a way in which to group related classes, functions and constants to avoid naming collisions.

#### What is the difference between Abstraction and Encapsulation?
**Answer:** 
- **Abstraction:** Hiding complex implementation details and showing only the essential features of the object (Focus on "What").
- **Encapsulation:** Bundling data and methods together and restricting direct access to some of the object's components (Focus on "How").

#### What are Magic Methods?
**Answer:** Special methods that start with `__` and are triggered by specific events (e.g., `__get`, `__set`, `__call`, `__toString`, `__sleep`, `__wakeup`).

### Senior
#### What is Dependency Injection?
**Answer:** A design pattern where an object receives its dependencies from the outside rather than creating them itself. This promotes loose coupling and easier testing.

#### What is the difference between the Factory Pattern and Dependency Injection?
**Answer:** Factory pattern is about *creating* objects, while Dependency Injection is about *providing* already created dependencies to an object.

#### What is Method Overloading in PHP?
**Answer:** PHP does not support traditional method overloading (same name, different arguments). Instead, it uses magic methods like `__call()` to simulate it.
[Method Overloading in PHP](answers/method_overloading.md)

---

## 3. PHP 7/8+ New Features

### Junior
#### What are Union Types (introduced in PHP 8.0)?
**Answer:** Union types allow you to specify multiple types for a parameter, property, or return value, instead of just one.
```php
function sum(int|float $a, int|float $b): int|float {
    return $a + $b;
}
```

#### What is the Nullsafe Operator (introduced in PHP 8.0)?
**Answer:** The `?->` operator allows you to safely access properties or methods on a potentially null value without throwing an error.
```php
$country = $session?->user?->getAddress()?->country;
```

### Middle
#### What are Enums (introduced in PHP 8.1)?
**Answer:** Enumerations allow you to define a set of named constants, providing type safety for fixed sets of values.
```php
enum Status: string {
    case Pending = 'pending';
    case Active = 'active';
}
```

#### What is Constructor Property Promotion (introduced in PHP 8.0)?
**Answer:** A shorthand syntax to define and initialize class properties directly in the constructor.
```php
class User {
    public function __construct(public string $name, public int $age) {}
}
```

### Senior
#### What are Readonly Classes (introduced in PHP 8.2)?
**Answer:** Marking a class as `readonly` makes all its properties readonly and prevents dynamic properties.
```php
readonly class Post {
    public function __construct(public string $title) {}
}
```

---

## 4. MySQL & Databases

### Junior
#### How to connect to a MySQL database using PHP?
**Answer:** You can use the `mysqli` extension or `PDO` (PHP Data Objects). 
```php
// PDO Example
$pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
```

#### What is the difference between `mysqli` and `PDO`?
**Answer:** 
- `mysqli` is specific to MySQL, while `PDO` supports multiple database systems (PostgreSQL, SQLite, etc.).
- `PDO` supports named placeholders in prepared statements.

#### What is the difference between `WHERE` and `HAVING`?
**Answer:** `WHERE` filters rows *before* aggregation, while `HAVING` filters *after* aggregation (usually with `GROUP BY`).

#### What is a Primary Key?
**Answer:** A primary key is a column (or a set of columns) that uniquely identifies each record in a table. It cannot be null.

#### What is the difference between `CHAR` and `VARCHAR`?
**Answer:** `CHAR` is fixed-length (padded with spaces), while `VARCHAR` is variable-length (uses only the necessary space plus 1-2 bytes for length).

#### What is the default port for MySQL?
**Answer:** 3306.

#### What is the difference between `CHAR_LENGTH` and `LENGTH`?
**Answer:** `CHAR_LENGTH` counts the number of characters, while `LENGTH` counts the number of bytes.

#### What do `%` and `_` represent in a `LIKE` statement?
**Answer:** 
- `%` matches any sequence of characters (zero or more).
- `_` matches exactly one character.

### Middle
#### What is a Transaction?
**Answer:** A sequence of database operations that are treated as a single unit of work. They must follow the ACID properties.

#### What are the main storage engines in MySQL?
**Answer:** 
- **InnoDB:** Supports transactions, row-level locking, and foreign keys (Default).
- **MyISAM:** Does not support transactions, uses table-level locking, faster for read-heavy operations.
- **MEMORY:** Stores data in RAM for very fast access, but data is lost if the server restarts.

#### What is a View?
**Answer:** A virtual table based on the result-set of an SQL query. It does not store data itself.

#### What is a Trigger?
**Answer:** A database object that automatically executes in response to certain events (INSERT, UPDATE, DELETE) on a particular table.

#### What is InnoDB?
**Answer:** A storage engine for MySQL that supports transactions, foreign keys, and row-level locking. It is the default engine.

#### What is an Index and why is it used?
**Answer:** An index is a data structure (like a B-tree) used to quickly locate records in a table. It improves query speed but can slow down inserts/updates.

#### What is the difference between `UNION` and `UNION ALL`?
**Answer:** `UNION` removes duplicate rows from the result set, while `UNION ALL` includes all rows, including duplicates.

### Senior
#### What is Sharding and Partitioning?
**Answer:** 
- **Partitioning:** Splitting a large table into smaller, more manageable pieces within the same database server.
- **Sharding:** Distributing data across multiple independent database servers (horizontal scaling).

#### What are ACID properties?
**Answer:** 
- **Atomicity:** All-or-nothing (everything succeeds or fails).
- **Consistency:** Transactions must transition the database from one valid state to another.
- **Isolation:** Transactions occur independently of each other.
- **Durability:** Committed data is permanently saved, even in a system crash.

#### What is a Clustered Index vs a Non-Clustered Index?
**Answer:** 
- **Clustered Index:** Determines the physical order of data in the table. There can only be one per table (usually the primary key).
- **Non-Clustered Index:** A separate structure that contains the indexed values and pointers to the data rows.

---

## 5. Laravel & Symfony

### Junior
#### What is the MVC architecture and how does Laravel implement it?
**Answer:** MVC stands for Model-View-Controller. 
- **Model:** Represents the data structure (Eloquent).
- **View:** Displays the data (Blade templates).
- **Controller:** Handles logic and user input.

#### What is Eloquent ORM?
**Answer:** Laravel's built-in Object-Relational Mapper that allows you to interact with your database using PHP objects instead of raw SQL.

#### What is Blade?
**Answer:** Blade is Laravel's powerful and simple templating engine, allowing you to use plain PHP in your templates with a clean syntax.

#### What is Routing in Laravel?
**Answer:** Mapping HTTP requests (URLs) to specific controller actions or closures.

#### What are Named Routes?
**Answer:** Assigning a name to a route to allow generating URLs or redirects by referencing the name instead of the raw URL.

#### What are Route Groups?
**Answer:** A way to group multiple routes that share common attributes (like middleware or prefixes).

#### What are Seeders and Factories?
**Answer:** 
- **Seeders:** Populate the database with test/dummy data.
- **Factories:** Define the blueprint for generating dummy model data.

#### What is Soft Delete?
**Answer:** Marking a record as deleted without actually removing it from the database, typically using a `deleted_at` column.

### Middle
#### What is the Laravel Service Container?
**Answer:** A powerful tool for managing class dependencies and performing dependency injection.
[Service Container Deep Dive](answers/laravel_service_container.md)

#### What are Collections?
**Answer:** A wrapper around PHP arrays that provides a powerful, fluent interface for manipulating data (e.g., `map`, `filter`, `reduce`).

#### What is Middleware?
**Answer:** A filter that inspects and filters HTTP requests entering your application (e.g., authentication, logging).

#### What are Service Providers?
**Answer:** The central place of all Laravel application bootstrapping. They bind services into the Service Container.

#### What are Migrations?
**Answer:** Version control for your database, allowing you to define your table structure in PHP code.

#### What is the difference between Authentication and Authorization?
**Answer:** 
- **Authentication:** Verifying *who* the user is (e.g., login).
- **Authorization:** Verifying *what* the user is allowed to do (e.g., permissions).

### Senior
#### What are Facades in Laravel?
**Answer:** They provide a "static" interface to classes available in the Service Container. They serve as "proxy" classes for accessing underlying implementations.

#### What are Events and Listeners?
**Answer:** A way to decouple components in your application. An event is dispatched, and one or more listeners react to it.

#### What are Contracts in Laravel?
**Answer:** A set of interfaces that define the core services provided by the framework. They allow for swapping underlying implementations.

#### What are Service Container and Service Provider roles?
**Answer:** 
- **Service Container:** The registry of all dependencies.
- **Service Provider:** The classes that register and boot those dependencies into the container.

---

## 6. Tools & Composer

### Junior
#### What is Composer?
**Answer:** A dependency manager for PHP that allows you to declare the libraries your project depends on and manages (install/update) them for you.

#### What is the difference between `composer.json` and `composer.lock`?
**Answer:** 
- `composer.json`: Lists the required dependencies and their version constraints.
- `composer.lock`: Stores the exact versions of the packages that were installed.

### Middle
#### What is Autoloading and how does Composer handle it?
**Answer:** Autoloading automatically loads class files when they are needed. Composer uses PSR-4 (and others) to map namespaces to directories.

---

## 7. Design Patterns & Architecture

### Junior
#### What is the Singleton Pattern?
**Answer:** A pattern that ensures a class has only one instance and provides a global point of access to it.

### Middle
#### What are SOLID Principles?
**Answer:** 
- **S:** Single Responsibility
- **O:** Open/Closed
- **L:** Liskov Substitution
- **I:** Interface Segregation
- **D:** Dependency Inversion
[SOLID Principles Guide](answers/solid_principles.md)

### Senior
#### What are the main design patterns used in Symfony and Doctrine?
**Answer:** 
- **Symfony:** Front Controller, Dependency Injection, Event Dispatcher.
- **Doctrine:** Data Mapper, Unit of Work, Repository.
[Design Patterns in Symfony & Doctrine](answers/design_patterns.md)

#### What are Anemic and Rich models?
**Answer:** 
- **Anemic Model:** Models that only contain data (getters/setters) but no business logic.
- **Rich Model:** Models that encapsulate both data and business logic (Domain-Driven Design).
[Anemic vs Rich Model Deep Dive](answers/architecture_advanced.md)

#### What is GRASP?
**Answer:** General Responsibility Assignment Software Patterns. A set of principles for assigning responsibilities to classes and objects.

#### What is CQRS?
**Answer:** Command Query Responsibility Segregation. A pattern that separates reading data (Query) from writing/updating data (Command).

#### What are the pros and cons of Microservices?
**Answer:** 
- **Pros:** Scalability, technology independence, easier deployment of small parts.
- **Cons:** Complexity of communication, data consistency issues, infrastructure overhead.
[Microservices Architecture](answers/architecture_highload.md)

---

## 8. Caching & Redis

### Junior
#### What is Caching?
**Answer:** Storing data in a temporary storage area (like RAM) to retrieve it faster on subsequent requests.

### Middle
#### Redis vs Memcached
**Answer:** 
- **Redis:** Supports various data types (strings, lists, sets, etc.), persistence, and pub/sub.
- **Memcached:** Simple key-value store, mostly for simple caching.
[Redis vs Memcached Comparison](answers/caching.md)

---

## 9. Infrastructure, Docker & DevOps

### Junior
#### What is Docker?
**Answer:** A platform for developing, shipping, and running applications in containers, ensuring that the application runs the same in any environment.

### Middle
#### Docker ENV vs ARG
**Answer:** 
- `ARG`: Variables available only during the image build process.
- `ENV`: Variables available during the build and also while the container is running.

#### What are Docker Volumes?
**Answer:** A way to persist data generated by and used by Docker containers, separated from the container's lifecycle.

#### What is the difference between Horizontal and Vertical scaling?
**Answer:** 
- **Vertical Scaling:** Adding more resources (CPU, RAM) to a single server.
- **Horizontal Scaling:** Adding more servers to distribute the load.

### Senior
#### What is CI/CD?
**Answer:** 
- **Continuous Integration (CI):** Automating the building and testing of code when changes are committed.
- **Continuous Delivery/Deployment (CD):** Automating the deployment of code to production or staging environments.

#### RabbitMQ vs Kafka
**Answer:** 
- **RabbitMQ:** A message broker that focuses on delivering messages to consumers (Push model). Great for complex routing.
- **Kafka:** A distributed streaming platform that focuses on high throughput and data persistence (Pull model). Great for log processing.

---

## 10. Testing & Quality

### Junior
#### What is Unit Testing?
**Answer:** A type of software testing where individual units or components of a software are tested. In PHP, PHPUnit is the standard tool.

#### What is Code Coverage?
**Answer:** A metric that measures the percentage of code lines executed by your test suite.

#### What is Integration Testing?
**Answer:** Testing how different modules or components of your application work together as a group.

### Middle
#### What is Mocking?
**Answer:** Creating a fake version of an object that simulates the behavior of the real object, used to isolate the unit of code being tested.

#### TDD vs BDD
**Answer:** 
- **TDD (Test-Driven Development):** Writing tests *before* writing the actual code. Focuses on implementation.
- **BDD (Behavior-Driven Development):** Writing tests based on expected behavior and user stories (e.g., Behat). Focuses on communication.

### Senior
#### What is Mutation Testing?
**Answer:** A type of testing where small changes (mutations) are introduced into the code to check if the existing tests fail. This measures the effectiveness of the tests.

---

## 11. Security

### Junior
#### What is the difference between Hashing and Encryption?
**Answer:** 
- **Hashing:** A one-way function that produces a fixed-length string from input. It cannot be reversed (e.g., `password_hash`).
- **Encryption:** A two-way function where data can be converted to ciphertext and then decrypted back to plaintext with a key.

#### Why do we use Salting when hashing passwords?
**Answer:** To prevent attackers from using precomputed tables (like Rainbow Tables) to crack passwords. A unique salt is added to each password before hashing.

### Middle
#### What is SQL Injection and how to prevent it?
**Answer:** A vulnerability where an attacker can execute malicious SQL statements. Prevented by using prepared statements and parameterized queries.

#### What is XSS (Cross-Site Scripting) and how to prevent it?
**Answer:** An attack where malicious scripts are injected into web pages. Prevented by escaping output (using `htmlspecialchars`) and sanitizing user input.

#### What is CSRF (Cross-Site Request Forgery) and how to prevent it?
**Answer:** An attack that forces an authenticated user to execute unwanted actions on a web application. Prevented by using CSRF tokens.

#### What is JWT (JSON Web Token)?
**Answer:** A compact, URL-safe means of representing claims to be transferred between two parties. Often used for stateless authentication.

### Senior
#### What is the OWASP Top 10?
**Answer:** A standard awareness document for developers and web application security, representing a broad consensus about the most critical security risks to web applications.

---

## 12. Web & API

### Junior
#### What is the difference between GET and POST?
**Answer:** 
- `GET`: Data is sent in the URL. Used for retrieving data.
- `POST`: Data is sent in the request body. Used for submitting data.

#### What are HTTP Status Codes? Give examples.
**Answer:** 
- `200 OK`: Success.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Client error.
- `401 Unauthorized`: User not authenticated.
- `403 Forbidden`: User authenticated but not allowed.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server error.

### Middle
#### What does "stateless" mean in the context of REST?
**Answer:** Each request from a client to a server must contain all the information necessary to understand and process the request. The server does not store any client context between requests.

#### SOAP vs REST
**Answer:** 
- **SOAP:** Protocol-based, uses XML, rigid structure, good for security and ACID compliance.
- **REST:** Architectural style, uses JSON/XML, flexible, lightweight, and uses standard HTTP.

#### REST vs JSON-RPC
**Answer:** 
- **REST:** Resource-oriented, uses HTTP methods (GET, POST, etc.) and status codes.
- **JSON-RPC:** Method-oriented, usually uses POST to a single endpoint with a JSON payload specifying the method and parameters.

---

## 13. Highload & Scalability

### Middle
#### What is Load Balancing?
**Answer:** Distributing network or application traffic across multiple servers to improve responsiveness and availability.

### Senior
#### How to optimize a slow GET endpoint that retrieves many records?
**Answer:** 
- Use pagination.
- Use caching (Redis/Memcached).
- Optimize database queries (indexing, select only needed columns).
- Use Eager Loading to avoid the N+1 problem.

#### What is the CAP Theorem?
**Answer:** In a distributed system, you can only provide two of the following three guarantees: Consistency, Availability, and Partition Tolerance.

#### What is Database Replication?
**Answer:** Copying data from one database server (Master) to another (Slave) to improve reliability, fault tolerance, and performance.

---

## 14. Clean Code & Best Practices

### Junior
#### What are DRY and KISS?
**Answer:** 
- **DRY:** Don't Repeat Yourself.
- **KISS:** Keep It Simple, Stupid.

#### What is YAGNI?
**Answer:** You Ain't Gonna Need It. Don't implement features until they are actually needed.

### Middle
#### What is Composition over Inheritance?
**Answer:** A principle that suggests achieving polymorphic behavior and code reuse by composing objects with other objects that implement the desired functionality, rather than inheriting from a base or parent class.

### Senior
#### What is the Law of Demeter?
**Answer:** A design guideline that says a module should not know about the innards of the objects it manipulates. "Don't talk to strangers."

---

## 15. Elasticsearch

### Middle
#### What is Elasticsearch and its main features?
**Answer:** A distributed, RESTful search and analytics engine built on top of Apache Lucene. It provides fast search capabilities across large datasets.
[Elasticsearch Features](answers/elasticsearch.md)

#### What is an Inverted Index?
**Answer:** The core data structure of Elasticsearch, which maps terms (words) to the documents where they occur, allowing for very fast searches.

#### What are Analyzers?
**Answer:** Components that process text during indexing or searching. They consist of a Character Filter, a Tokenizer, and a Token Filter.

---

## 16. Tricky Questions

### Junior
#### What is the difference between `==` and `===`?
**Answer:** 
- `==`: Equality (checks value, performs type juggling).
- `===`: Identity (checks both value and type).

#### What happens when you compare "10" and 10 using `==`?
**Answer:** It returns `true` because of type juggling.

#### What does the following code output?
```php
function foo(&$var) {
    $var++;
}
$a = 5;
foo($a);
echo $a;
```
**Answer:** `6`. The `&` operator passes the variable by reference, so the modification inside the function affects the original variable.

### Middle
#### What is the difference between `array_merge()` and the `+` operator for arrays?
**Answer:** 
- `array_merge()`: For string keys, the latter value overrides the former. For numeric keys, values are appended and re-indexed.
- `+`: For string keys, the former value is kept, and the latter is ignored. For numeric keys, it also keeps the former.

#### How do static properties behave in inherited classes?
**Answer:** Static properties are shared among all classes in an inheritance hierarchy unless they are explicitly overridden in a child class.

### Senior
#### Why is it risky to use PHP as a daemon?
**Answer:** PHP was originally designed for short-lived requests. In a long-lived process, memory leaks in your code or libraries will eventually crash the process.

---

## 17. Laravel Plugins

### Junior
#### What are some of the most popular official Laravel plugins?
**Answer:** Laravel provides an extensive ecosystem of official packages to extend its functionality. Some of the most widely used ones include:
- **Laravel Horizon:** A beautiful dashboard and code-driven configuration for Redis-powered queues.
- **Laravel Breeze:** A minimal, simple implementation of all of Laravel's authentication features.
- **Laravel Sanctum:** Provides a featherweight authentication system for APIs and SPAs.
- **Laravel Socialite:** A fluent interface to OAuth authentication with various providers (Google, GitHub, etc.).
- **Laravel Sail:** A light-weight CLI for interacting with Laravel's default Docker configuration.

### Middle
#### What is the purpose of Laravel Horizon and Laravel Octane?
**Answer:** 
- **Laravel Horizon:** Provides a dashboard to monitor job throughput, runtime, and failures in Redis queues. It allows for code-driven configuration of queue workers.
- **Laravel Octane:** Supercharges application performance by keeping it "bootstrapped" in memory using high-powered servers like Swoole or RoadRunner.

#### What are Laravel Livewire and Laravel Inertia?
**Answer:**
- **Laravel Livewire:** A full-stack framework that allows building dynamic interfaces using only PHP and minimal JavaScript.
- **Laravel Inertia:** Allows building single-page apps using classic server-side routing and controllers with modern frontend frameworks like Vue or React.

### Senior
#### Compare Laravel Pulse and Laravel Telescope.
**Answer:**
- **Laravel Pulse:** Designed for **real-time monitoring** of application health and performance in production (e.g., slow routes, high CPU usage).
- **Laravel Telescope:** A **debug assistant** for local development or staging, providing deep insight into requests, exceptions, logs, database queries, and more.

#### Provide a comprehensive list of Laravel plugins with their descriptions and documentation links for versions 11, 12, and 13.
**Answer:**
Below is a list of prominent Laravel packages and plugins, their short descriptions, the Laravel version they were introduced in (or became major parts of the ecosystem), and their documentation links.

| Plugin | Short Description | Since | v11 Docs | v12 Docs | v13 Docs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Horizon** | Dashboard and code-driven configuration for Redis queues. | 5.5 | [Link](https://laravel.com/docs/11.x/horizon) | [Link](https://laravel.com/docs/12.x/horizon) | [Link](https://laravel.com/docs/13.x/horizon) |
| **Livewire** | Full-stack framework for building dynamic interfaces in PHP. | 2019 | [Link](https://livewire.laravel.com) | [Link](https://livewire.laravel.com) | [Link](https://livewire.laravel.com) |
| **Octane** | Performance booster using Swoole or RoadRunner. | 8.0 | [Link](https://laravel.com/docs/11.x/octane) | [Link](https://laravel.com/docs/12.x/octane) | [Link](https://laravel.com/docs/13.x/octane) |
| **Telescope** | Elegant debug assistant for monitoring application state. | 5.7 | [Link](https://laravel.com/docs/11.x/telescope) | [Link](https://laravel.com/docs/12.x/telescope) | [Link](https://laravel.com/docs/13.x/telescope) |
| **Sanctum** | API and SPA authentication (formerly Airlock). | 7.0 | [Link](https://laravel.com/docs/11.x/sanctum) | [Link](https://laravel.com/docs/12.x/sanctum) | [Link](https://laravel.com/docs/13.x/sanctum) |
| **Pulse** | Real-time health and performance monitoring tool. | 10.x | [Link](https://laravel.com/docs/11.x/pulse) | [Link](https://laravel.com/docs/12.x/pulse) | [Link](https://laravel.com/docs/13.x/pulse) |
| **Reverb** | First-party, high-performance WebSocket server. | 11.0 | [Link](https://laravel.com/docs/11.x/reverb) | [Link](https://laravel.com/docs/12.x/reverb) | [Link](https://laravel.com/docs/13.x/reverb) |
| **Breeze** | Minimal authentication scaffolding. | 8.0 | [Link](https://laravel.com/docs/11.x/starter-kits#laravel-breeze) | [Link](https://laravel.com/docs/12.x/starter-kits#laravel-breeze) | [Link](https://laravel.com/docs/13.x/starter-kits#laravel-breeze) |
| **Jetstream** | Advanced application scaffolding (Inertia/Livewire). | 8.0 | [Link](https://jetstream.laravel.com) | [Link](https://jetstream.laravel.com) | [Link](https://jetstream.laravel.com) |
| **Cashier** | Subscription billing with Stripe or Paddle. | 4.2 | [Link](https://laravel.com/docs/11.x/cashier) | [Link](https://laravel.com/docs/12.x/cashier) | [Link](https://laravel.com/docs/13.x/cashier) |
| **Dusk** | Browser automation and testing API. | 5.4 | [Link](https://laravel.com/docs/11.x/dusk) | [Link](https://laravel.com/docs/12.x/dusk) | [Link](https://laravel.com/docs/13.x/dusk) |
| **Scout** | Full-text search for Eloquent models. | 5.3 | [Link](https://laravel.com/docs/11.x/scout) | [Link](https://laravel.com/docs/12.x/scout) | [Link](https://laravel.com/docs/13.x/scout) |
| **Socialite** | OAuth authentication with various providers. | 5.0 | [Link](https://laravel.com/docs/11.x/socialite) | [Link](https://laravel.com/docs/12.x/socialite) | [Link](https://laravel.com/docs/13.x/socialite) |
| **Sail** | CLI for interacting with Laravel's Docker environment. | 8.x | [Link](https://laravel.com/docs/11.x/sail) | [Link](https://laravel.com/docs/12.x/sail) | [Link](https://laravel.com/docs/13.x/sail) |
| **Pennant** | Simple, lightweight feature flag package. | 10.x | [Link](https://laravel.com/docs/11.x/pennant) | [Link](https://laravel.com/docs/12.x/pennant) | [Link](https://laravel.com/docs/13.x/pennant) |
| **Folio** | Page-based routing for Laravel applications. | 10.x | [Link](https://laravel.com/docs/11.x/folio) | [Link](https://laravel.com/docs/12.x/folio) | [Link](https://laravel.com/docs/13.x/folio) |
| **Volt** | Elegantly build Livewire components in a single file. | 10.x | [Link](https://livewire.laravel.com/docs/volt) | [Link](https://livewire.laravel.com/docs/volt) | [Link](https://livewire.laravel.com/docs/volt) |
| **Pint** | Opinionated PHP code style fixer for minimalists. | 9.x | [Link](https://laravel.com/docs/11.x/pint) | [Link](https://laravel.com/docs/12.x/pint) | [Link](https://laravel.com/docs/13.x/pint) |
| **Envoy** | Simple task runner for remote servers. | 5.1 | [Link](https://laravel.com/docs/11.x/envoy) | [Link](https://laravel.com/docs/12.x/envoy) | [Link](https://laravel.com/docs/13.x/envoy) |
| **Prompts** | Beautiful, user-friendly forms for CLI applications. | 10.x | [Link](https://laravel.com/docs/11.x/prompts) | [Link](https://laravel.com/docs/12.x/prompts) | [Link](https://laravel.com/docs/13.x/prompts) |
| **Echo** | Real-time event broadcasting client. | 5.3 | [Link](https://laravel.com/docs/11.x/broadcasting) | [Link](https://laravel.com/docs/12.x/broadcasting) | [Link](https://laravel.com/docs/13.x/broadcasting) |
