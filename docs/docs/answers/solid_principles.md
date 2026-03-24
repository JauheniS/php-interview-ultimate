---
title: SOLID Principles in PHP
slug: /answers/solid_principles
---

# SOLID Principles in PHP

SOLID is an acronym for five design principles intended to make software designs more understandable, flexible, and maintainable.

## 1. Single Responsibility Principle (SRP)

> A class should have one, and only one, reason to change.

Meaning a class should only have one job. For example, if a class handles both user data and sending emails, it should be split into two classes.

## 2. Open/Closed Principle (OCP)

> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

You should be able to add new functionality without changing existing code. This is usually achieved using interfaces or abstract classes.

## 3. Liskov Substitution Principle (LSP)

> Let $\phi(x)$ be a property provable about objects $x$ of type $T$. Then $\phi(y)$ should be true for objects $y$ of type $S$ where $S$ is a subtype of $T$.

In simpler terms: Child classes must be able to replace parent classes without breaking the application.

## 4. Interface Segregation Principle (ISP)

> A client should never be forced to depend on methods it does not use.

Better to have several specific interfaces rather than one large, general-purpose interface.

## 5. Dependency Inversion Principle (DIP)

> 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
> 2. Abstractions should not depend on details. Details should depend on abstractions.

This means you should depend on interfaces rather than concrete classes.

### Liskov Substitution Principle (LSP) Tricky Questions

- **Does adding a public field in an extended class violate LSP?**
  Generally, no. LSP is about behavioral subtyping. However, if the base class is intended to be used in a way that assumes it has _only_ certain fields, adding more might complicate its use, but it doesn't strictly break the substitution of the base class.
- **Does throwing an exception inside a method of an extended class violate LSP?**
  Yes, if the base class method does not specify that it can throw that exception (or any exception). The calling code expects the base class behavior. If the child class throws an unexpected exception, the calling code will break, violating LSP.

### Example:

Instead of:

```php
class MySQLConnection {
    public function connect() { ... }
}

class PasswordReminder {
    private $db;
    public function __construct(MySQLConnection $db) {
        $this->db = $db;
    }
}
```

Use (DIP):

```php
interface DBConnectionInterface {
    public function connect();
}

class PasswordReminder {
    private $db;
    public function __construct(DBConnectionInterface $db) {
        $this->db = $db;
    }
}
```

Now `PasswordReminder` depends on an abstraction, not a specific database engine.
