# Ultimate PHP Interview Questions & Answers

This file contains a curated list of PHP interview questions and answers, merged from multiple sources and categorized by level (Junior, Middle, Senior).

## Table of Contents
1. [PHP Basics & Language Features](#1-php-basics--language-features)
2. [Design Patterns](#2-design-patterns)
3. [Object-Oriented Programming (OOP)](#3-object-oriented-programming-oop)
4. [PHP 7/8+ New Features](#4-php-78-new-features)
5. [MySQL & Databases](#5-mysql--databases)
6. [Laravel & Symfony](#6-laravel--symfony)
7. [Tools & Composer](#7-tools--composer)
8. [Software Architecture & Principles](#8-software-architecture--principles)
9. [Caching & Redis](#9-caching--redis)
10. [Infrastructure, Docker & DevOps](#10-infrastructure-docker--devops)
11. [Testing & Quality](#11-testing--quality)
12. [Security](#12-security)
13. [Web & API](#13-web--api)
14. [Highload & Scalability](#14-highload--scalability)
15. [Clean Code & Best Practices](#15-clean-code--best-practices)
16. [Elasticsearch](#16-elasticsearch)
17. [Tricky Questions](#17-tricky-questions)
18. [Laravel Plugins](#18-laravel-plugins)
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
**Answer:** 
PHP uses a reference counting mechanism and a cyclic garbage collector to automatically free memory occupied by objects and variables that are no longer reachable.

- **Reference Counting:** Every `zval` (except simple types in PHP 7+) has a `refcount`. When it reaches zero, memory is freed immediately.
- **What is a "Cycle"?** A cycle occurs when objects point to each other (circular references), preventing their `refcounts` from reaching zero even after being unset.
- **How it cleans:** When the "root buffer" reaches its limit, the collector temporarily decrements internal refcounts. If a refcount hits zero, the object is marked as garbage and swept.
- **Performance:** GC prevents memory leaks (crucial for daemons/workers) but adds CPU overhead during collection cycles.

[Detailed Garbage Collection Guide](answers/garbage_collector.md)

#### What is a zval and what is its basic structure? ⭐ **Important**
**Answer:** A `zval` (Zend value) is the fundamental data structure used by the Zend Engine to represent any PHP variable. In PHP 5, it consists of:
- **value:** A union that stores the actual data.
- **refcount:** Number of symbols pointing to this `zval`.
- **type:** The variable's type.
- **is_ref:** A boolean flag indicating if it is a reference.
[Detailed Zval Structure Guide](https://www.phpinternalsbook.com/php5/zvals/basic_structure.html)

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

## 2. Design Patterns

### Junior
#### What are the main categories of Design Patterns?
**Answer:** Design patterns are generally categorized into three groups:
- **Creational Patterns:** Focus on object creation mechanisms.
- **Structural Patterns:** Focus on how classes and objects are composed to form larger structures.
- **Behavioral Patterns:** Focus on communication between objects.

#### What is the Singleton Pattern?
**Answer:** A pattern that ensures a class has only one instance and provides a global point of access to it. It is a Creational Pattern.

### Middle
#### What is the Factory Method Pattern?
**Answer:** Factory Method is a creational design pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

**Common Usages / Pros & Cons:**
- **Pros:** You avoid tight coupling between the creator and the concrete products., Single Responsibility Principle. You can move the product creation code into one place in the program, making the code easier to support., Open/Closed Principle. You can introduce new types of products into the program without breaking existing client code.
- **Cons:** The code may become more complicated since you need to introduce a lot of new subclasses to implement the pattern. The best case scenario is when you’re introducing the pattern into an existing hierarchy of creator classes.

#### What is the Abstract Factory Pattern?
**Answer:** Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.

**Common Usages / Pros & Cons:**
- **Pros:** You can be sure that the products you’re getting from a factory are compatible with each other., You avoid tight coupling between concrete products and client code., Single Responsibility Principle. You can extract the product creation code into one place, making the code easier to support., Open/Closed Principle. You can introduce new variants of products without breaking existing client code.
- **Cons:** The code may become more complicated than it should be, since a lot of new interfaces and classes are introduced along with the pattern.

#### What is the Builder Pattern?
**Answer:** Builder is a creational design pattern that lets you construct complex objects step by step. The pattern allows you to produce different types and representations of an object using the same construction code.

**Common Usages / Pros & Cons:**
- **Pros:** You can construct objects step-by-step, defer construction steps or run steps recursively., You can reuse the same construction code when building various representations of products., Single Responsibility Principle. You can isolate complex construction code from the business logic of the product.
- **Cons:** The overall complexity of the code increases since the pattern requires creating multiple new classes.

#### What is the Prototype Pattern?
**Answer:** Prototype is a creational design pattern that lets you copy existing objects without making your code dependent on their classes.

**Common Usages / Pros & Cons:**
- **Pros:** You can clone objects without coupling to their concrete classes., You can get rid of repeated initialization code in favor of cloning pre-configured prototypes., You can produce complex objects more conveniently., You get an alternative to inheritance when dealing with configuration presets for complex objects.
- **Cons:** Cloning complex objects that have circular references might be very tricky.

#### What is the Adapter Pattern?
**Answer:** Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.

**Common Usages / Pros & Cons:**
- **Pros:** Single Responsibility Principle. You can separate the interface or data conversion code from the primary business logic of the program., Open/Closed Principle. You can introduce new types of adapters into the program without breaking the existing client code, as long as they work with the adapters through the client interface.
- **Cons:** The overall complexity of the code increases because you need to introduce a set of new interfaces and classes. Sometimes it’s simpler just to change the service class so that it fits with the rest of your code.

#### What is the Bridge Pattern?
**Answer:** Bridge is a structural design pattern that lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.

**Common Usages / Pros & Cons:**
- **Pros:** You can create platform-independent classes and apps., The client code works with high-level abstractions. It isn’t exposed to the platform details., Open/Closed Principle. You can introduce new abstractions and implementations independently from each other., Single Responsibility Principle. You can focus on high-level logic in the abstraction and on platform details in the implementation.
- **Cons:** You might make the code more complicated by applying the pattern to a highly cohesive class.

#### What is the Composite Pattern?
**Answer:** Composite is a structural design pattern that lets you compose objects into tree structures and then work with these structures as if they were individual objects.

**Common Usages / Pros & Cons:**
- **Pros:** You can work with complex tree structures more conveniently: use polymorphism and recursion to your advantage., Open/Closed Principle. You can introduce new element types into the app without breaking the existing code, which now works with the object tree.
- **Cons:** It might be difficult to provide a common interface for classes whose functionality differs too much. In certain scenarios, you’d need to overgeneralize the component interface, making it harder to comprehend.

#### What is the Decorator Pattern?
**Answer:** Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

**Common Usages / Pros & Cons:**
- **Pros:** You can extend an object’s behavior without making a new subclass., You can add or remove responsibilities from an object at runtime., You can combine several behaviors by wrapping an object into multiple decorators., Single Responsibility Principle. You can divide a monolithic class that implements many possible variants of behavior into several smaller classes.
- **Cons:** It’s hard to remove a specific wrapper from the wrappers stack., It’s hard to implement a decorator in such a way that its behavior doesn’t depend on the order in the decorators stack., The initial configuration code of layers might look pretty ugly.

#### What is the Facade Pattern?
**Answer:** Facade is a structural design pattern that provides a simplified interface to a library, a framework, or any other complex set of classes.

**Common Usages / Pros & Cons:**
- **Pros:** You can isolate your code from the complexity of a subsystem.
- **Cons:** A facade can become a god object coupled to all classes of an app.

#### What is the Flyweight Pattern?
**Answer:** Flyweight is a structural design pattern that lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.

**Common Usages / Pros & Cons:**
- **Pros:** You can save lots of RAM, assuming your program has tons of similar objects.
- **Cons:** You might be exchanging RAM for CPU cycles when part of the state data needs to be recalculated every time someone calls a flyweight method., The code becomes much more complicated. New team members will always be wondering why the state of an entity was separated in such a way.

#### What is the Proxy Pattern?
**Answer:** Proxy is a structural design pattern that lets you provide a substitute or placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the request gets through to the original object.

**Common Usages / Pros & Cons:**
- **Pros:** You can control the service object without clients knowing about it., You can manage the lifecycle of the service object when clients don’t care about it., The proxy works even if the service object isn’t ready or is not available., Open/Closed Principle. You can introduce new proxies without changing the service or clients.
- **Cons:** The code may become more complicated since you need to introduce a lot of new classes., The response from the service might get delayed.

#### What is the Chain of Responsibility Pattern?
**Answer:** Chain of Responsibility is a behavioral design pattern that lets you pass requests along a chain of handlers. Upon receiving a request, each handler decides either to process the request or to pass it to the next handler in the chain.

**Common Usages / Pros & Cons:**
- **Pros:** You can control the order of request handling., Single Responsibility Principle. You can decouple classes that invoke operations from classes that perform operations., Open/Closed Principle. You can introduce new handlers into the app without breaking the existing client code.
- **Cons:** Some requests may end up unhandled.

#### What is the Command Pattern?
**Answer:** Command is a behavioral design pattern that turns a request into a stand-alone object that contains all information about the request. This transformation lets you pass requests as a method arguments, delay or queue a request’s execution, and support undoable operations.

**Common Usages / Pros & Cons:**
- **Pros:** Single Responsibility Principle. You can decouple classes that invoke operations from classes that perform these operations., Open/Closed Principle. You can introduce new commands into the app without breaking existing client code., You can implement undo/redo., You can implement deferred execution of operations., You can assemble a set of simple commands into a complex one.
- **Cons:** The code may become more complicated since you’re introducing a whole new layer between senders and receivers.

#### What is the Mediator Pattern?
**Answer:** Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.

**Common Usages / Pros & Cons:**
- **Pros:** Single Responsibility Principle. You can extract the communications between various components into a single place, making it easier to comprehend and maintain., Open/Closed Principle. You can introduce new mediators without having to change the actual components., You can reduce coupling between various components of a program., You can reuse individual components more easily.
- **Cons:** Over time a mediator can evolve into a God Object.

#### What is the Iterator Pattern?
**Answer:** Iterator is a behavioral design pattern that lets you traverse elements of a collection without exposing its underlying representation (list, stack, tree, etc.).

**Common Usages / Pros & Cons:**
- **Pros:** Single Responsibility Principle. You can clean up the client code and the collections by extracting bulky traversal algorithms into separate classes., Open/Closed Principle. You can implement new types of collections and iterators and pass them to existing code without breaking anything., You can iterate over the same collection in parallel because each iterator object contains its own traversal state., For the same reason, you can delay a traversal and continue it when needed.
- **Cons:** Applying the pattern can be an overkill if your app only works with simple collections., Using an iterator may be less efficient than going through elements of some specialized collections directly.

#### What is the Memento Pattern?
**Answer:** Memento is a behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation.

**Common Usages / Pros & Cons:**
- **Pros:** You can produce snapshots of the object’s state without violating its encapsulation., You can simplify the originator’s code by letting the caretaker maintain the history of the originator’s state.
- **Cons:** The app might consume lots of RAM if clients create mementos too often., Caretakers should track the originator’s lifecycle to be able to destroy obsolete mementos., Most dynamic programming languages, such as PHP, Python and JavaScript, can’t guarantee that the state within the memento stays untouched.

#### What is the Observer Pattern?
**Answer:** Observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.

**Common Usages / Pros & Cons:**
- **Pros:** Open/Closed Principle. You can introduce new subscriber classes without having to change the publisher’s code (and vice versa if there’s a publisher interface)., You can establish relations between objects at runtime.
- **Cons:** Subscribers are notified in random order.

#### What is the State Pattern?
**Answer:** State is a behavioral design pattern that lets an object alter its behavior when its internal state changes. It appears as if the object changed its class.

**Common Usages / Pros & Cons:**
- **Pros:** Single Responsibility Principle. Organize the code related to particular states into separate classes., Open/Closed Principle. Introduce new states without changing existing state classes or the context., Simplify the code of the context by eliminating bulky state machine conditionals.
- **Cons:** Applying the pattern can be overkill if a state machine has only a few states or rarely changes.

#### What is the Strategy Pattern?
**Answer:** Strategy is a behavioral design pattern that lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.

**Common Usages / Pros & Cons:**
- **Pros:** You can swap algorithms used inside an object at runtime., You can isolate the implementation details of an algorithm from the code that uses it., You can replace inheritance with composition., Open/Closed Principle. You can introduce new strategies without having to change the context.
- **Cons:** If you only have a couple of algorithms and they rarely change, there’s no real reason to overcomplicate the program with new classes and interfaces that come along with the pattern., Clients must be aware of the differences between strategies to be able to select a proper one., A lot of modern programming languages have functional type support that lets you implement different versions of an algorithm inside a set of anonymous functions. Then you could use these functions exactly as you’d have used the strategy objects, but without bloating your code with extra classes and interfaces.

#### What is the Template Method Pattern?
**Answer:** Template Method is a behavioral design pattern that defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.

**Common Usages / Pros & Cons:**
- **Pros:** You can let clients override only certain parts of a large algorithm, making them less affected by changes that happen to other parts of the algorithm., You can pull the duplicate code into a superclass.
- **Cons:** Some clients may be limited by the provided skeleton of an algorithm., You might violate the Liskov Substitution Principle by suppressing a default step implementation via a subclass., Template methods tend to be harder to maintain the more steps they have.

#### What is the Visitor Pattern?
**Answer:** Visitor is a behavioral design pattern that lets you separate algorithms from the objects on which they operate.

**Common Usages / Pros & Cons:**
- **Pros:** Open/Closed Principle. You can introduce a new behavior that can work with objects of different classes without changing these classes., Single Responsibility Principle. You can move multiple versions of the same behavior into the same class., A visitor object can accumulate some useful information while working with various objects. This might be handy when you want to traverse some complex object structure, such as an object tree, and apply the visitor to these objects.
- **Cons:** You need to update all visitors each time a class gets added to or removed from the element hierarchy., Visitors might lack the necessary access to the private fields and methods of the elements that they’re supposed to work with.

### Senior
#### What is Dependency Injection?
**Answer:** A design pattern where an object receives its dependencies from the outside rather than creating them itself. This promotes loose coupling and easier testing.

#### What is the difference between the Factory Pattern and Dependency Injection?
**Answer:** Factory pattern is about *creating* objects, while Dependency Injection is about *providing* already created dependencies to an object.

#### What are the main design patterns used in Symfony and Doctrine?
**Answer:**
- **Symfony:** Front Controller, Dependency Injection, Event Dispatcher.
- **Doctrine:** Data Mapper, Unit of Work, Repository.
[Design Patterns in Symfony & Doctrine](answers/design_patterns.md)

---

## 3. Object-Oriented Programming (OOP)

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
#### What is Method Overloading in PHP?
**Answer:** PHP does not support traditional method overloading (same name, different arguments). Instead, it uses magic methods like `__call()` to simulate it.
[Method Overloading in PHP](answers/method_overloading.md)

---

## 4. PHP 7/8+ New Features

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

#### What is the `#[Override]` attribute (introduced in PHP 8.3)?
**Answer:** The `#[Override]` attribute ensures that a method with the same name exists in a parent class or interface. This helps catch errors during refactoring.
```php
class Child extends ParentClass {
    #[Override]
    public function existingMethod() {}
}
```

#### What are the new `array_*()` functions (introduced in PHP 8.4)?
**Answer:** PHP 8.4 introduced several useful array functions: `array_find()`, `array_find_key()`, `array_any()`, and `array_all()`.
```php
$firstEven = array_find([1, 2, 3, 4], fn($v) => $v % 2 === 0); // 2
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

#### What are Typed Class Constants (introduced in PHP 8.3)?
**Answer:** Class constants can now have type declarations, similar to properties and parameters.
```php
class User {
    const string ROLE = 'admin';
}
```

#### What is Asymmetric Visibility (introduced in PHP 8.4)?
**Answer:** Properties can now have different visibility for reading and writing.
```php
class User {
    public private(set) string $name;
}
```

#### What are Property Hooks (introduced in PHP 8.4)?
**Answer:** Property hooks allow defining custom logic for getting and setting property values directly in the property declaration.
```php
class User {
    public string $fullName {
        get => "{$this->firstName} {$this->lastName}";
    }
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

#### What is "Clone With" (introduced in PHP 8.5)?
**Answer:** Allows modifying properties of a cloned object during the cloning process using object initializer syntax.
```php
$user2 = clone $user1 with { name: "New Name" };
```

#### What is the Pipe Operator (introduced in PHP 8.5)?
**Answer:** The `|>` operator allows chaining function calls in a more readable way, passing the result of the left side as the first argument to the right side.
```php
$result = "  hello  " |> 'trim' |> 'strtoupper';
```

[PHP 8.0 Features](answers/php80_features.md)
[PHP 8.1 Features](answers/php81_features.md)
[PHP 8.2 Features](answers/php82_features.md)
[PHP 8.3 Features](answers/php83_features.md)
[PHP 8.4 Features](answers/php84_features.md)
[PHP 8.5 Features](answers/php85_features.md)

---

## 5. MySQL & Databases

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

#### What are the ACID properties?
**Answer:** 
- **Atomicity:** All-or-nothing. Ensures that all operations within a transaction are completed; if any fails, the entire transaction is rolled back.
- **Consistency:** Ensures that a transaction transforms the database from one valid state to another, maintaining all predefined rules.
- **Isolation:** Prevents concurrent transactions from interfering with each other.
- **Durability:** Once a transaction is committed, its changes are permanent, even in the case of a system failure.

#### What are the main Transaction Control commands?
**Answer:**
- `START TRANSACTION` (or `BEGIN`): Starts a new transaction.
- `COMMIT`: Saves changes permanently.
- `ROLLBACK`: Undoes changes since the start of the transaction.
- `SAVEPOINT`: Sets a point within a transaction to which you can later roll back.
- `ROLLBACK TO SAVEPOINT`: Reverts changes only up to the specified savepoint.

#### What is Autocommit in MySQL?
**Answer:** A setting where every individual SQL statement is treated as a transaction and is automatically committed immediately after execution. It can be disabled using `SET autocommit = 0`.

#### What is a Deadlock?
**Answer:** A situation where two or more transactions are waiting for each other to release locks, creating a cycle of dependencies that prevents any of them from proceeding. MySQL typically detects this and rolls back one of the transactions.

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

#### What is the difference between MariaDB and MySQL?
**Answer:** MariaDB is an open-source fork of MySQL created by the original developers after Oracle's acquisition of MySQL. While it maintains high compatibility, MariaDB offers more storage engines, performance improvements, and remains fully open-source (GPL), whereas MySQL has both a community and an enterprise version.
[MariaDB vs MySQL Comparison](answers/mysql_advanced.md#9-mariadb-vs-mysql)

### Senior
#### What is Sharding and Partitioning?
**Answer:** 
- **Partitioning:** Splitting a large table into smaller, more manageable pieces within the same database server.
- **Sharding:** Distributing data across multiple independent database servers (horizontal scaling).

#### What is a Clustered Index vs a Non-Clustered Index?
**Answer:** 
- **Clustered Index:** Determines the physical order of data in the table. There can only be one per table (usually the primary key).
- **Non-Clustered Index:** A separate structure that contains the indexed values and pointers to the data rows.

#### What isolation levels do you know?
**Answer:** The standard isolation levels are Read Uncommitted, Read Committed, Repeatable Read, and Serializable. They define the trade-off between consistency and performance in concurrent transactions.
[In-depth Database Isolation Levels Guide](answers/mysql_advanced.md#5-transaction-isolation-levels)

#### What is the difference between Read Committed and Dirty Read?
**Answer:** A Dirty Read occurs in Read Uncommitted where a transaction sees uncommitted data from another transaction. Read Committed prevents this by ensuring a transaction only sees data that has already been committed.
[In-depth Database Isolation Levels Guide](answers/mysql_advanced.md#5-transaction-isolation-levels)

#### Provide examples of transaction isolation levels and the issues they address.
**Answer:**
- **Read Uncommitted:** Reading a bank balance being updated but not yet committed (Dirty Read).
- **Read Committed:** A report reading the same data twice and getting different results because another transaction committed an update in between (Non-Repeatable Read).
- **Repeatable Read:** Ensuring a consistent snapshot of data throughout a long-running transaction, even if other transactions commit changes.
- **Serializable:** Financial systems where absolute correctness is required, preventing all concurrency issues like Phantom Reads at the cost of performance.
[In-depth Database Isolation Levels Guide](answers/mysql_advanced.md#51-practical-examples-of-isolation-levels)

#### What is the difference between MySQL and PostgreSQL?
**Answer:** MySQL is known for its speed and ease of use in web development, while PostgreSQL is an object-relational database known for its advanced features, strict SQL compliance, and better handling of complex queries and high-concurrency workloads.
[MySQL vs PostgreSQL Comparison](answers/mysql_advanced.md#10-mysql-vs-postgresql)

#### We have a filter with 3 columns from one table: `sku` (unique), `creation_date`, and an `integer_field` (values 1, 2, or 3). How would you index this for maximum performance?
**Answer:** Create a **composite index** including all three fields. This is more performant than separate indexes because it allows MySQL to filter all three conditions in a single index scan. With separate indexes, the database would typically use only one and then perform a slower check for the remaining conditions.
[Composite Index Strategy](answers/mysql_advanced.md#11-composite-index-strategy)

---

## 6. Laravel & Symfony

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

## 7. Tools & Composer

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

## 8. Software Architecture & Principles

### Middle
#### What are SOLID Principles?
**Answer:** 
- **S:** Single Responsibility
- **O:** Open/Closed
- **L:** Liskov Substitution
- **I:** Interface Segregation
- **D:** Dependency Inversion
[SOLID Principles Guide](answers/solid_principles.md)


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
- **Pros:** Independent scaling, speed and agility, technology independence, and fault isolation.
- **Cons:** Management complexity, data consistency issues (distributed transactions), network latency, and complex monitoring.
[Microservices Architecture](answers/architecture_highload.md)

---

## 9. Caching & Redis

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

## 10. Infrastructure, Docker & DevOps

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

## 11. Testing & Quality

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

## 12. Security

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

## 13. Web & API

### Junior
#### What is REST API?
**Answer:** REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol — and in virtually all cases, the HTTP protocol is used.
[Read more: What is REST API?](https://www.ibm.com/think/topics/rest-apis)
#### What are the main HTTP methods used in REST?
**Answer:**
- `GET`: Retrieve a resource.
- `POST`: Create a new resource.
- `PUT`: Update/replace an existing resource.
- `PATCH`: Partially update an existing resource.
- `DELETE`: Delete a resource.
- `OPTIONS`: Describe the communication options for the target resource.
- `HEAD`: Same as GET but returns only the headers (no body).
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

#### Can you implement your own HTTP method like POSTAWESOME instead of POST? Would it be in compliance with REST?
**Answer:**
Technically, yes, you can define and use custom HTTP methods. The HTTP protocol allows for extension, and most web servers and clients can be configured to handle them.
However, it would **not** be fully in compliance with the **Uniform Interface** constraint of REST. REST emphasizes a standardized set of methods (the standard HTTP verbs) to ensure interoperability, predictability, and to leverage existing web infrastructure (like caches and proxies) that only understand standard methods. Using `POSTAWESOME` would break these benefits and make your API harder to consume.

---

## 14. Highload & Scalability

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

## 15. Clean Code & Best Practices

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

## 16. Elasticsearch

### Middle
#### What is Elasticsearch and its main features?
**Answer:** A distributed, RESTful search and analytics engine built on top of Apache Lucene. It provides fast search capabilities across large datasets.
[Elasticsearch Features](answers/elasticsearch.md)

#### What is an Inverted Index?
**Answer:** The core data structure of Elasticsearch, which maps terms (words) to the documents where they occur, allowing for very fast searches.

#### What are Analyzers?
**Answer:** Components that process text during indexing or searching. They consist of a Character Filter, a Tokenizer, and a Token Filter.

---

## 17. Tricky Questions

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

## 18. Laravel Plugins

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
