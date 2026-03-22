---
title: "PHP 8.1 New Features"
slug: "/answers/php81_features"
---

# PHP 8.1 New Features

[Official Documentation: PHP 8.1 Release](https://www.php.net/releases/8.1/en.php)

## 1. Enumerations (Enums)
Natively support enumerations.
```php
enum Status {
    case Draft;
    case Published;
    case Archived;
}
```

## 2. Readonly Properties
Properties that cannot be modified after they are initialized.
```php
class BlogData {
    public readonly Status $status;
    public function __construct(Status $status) {
        $this->status = $status;
    }
}
```

## 3. First-class Callable Syntax
Simplified syntax to get a reference to any function.
```php
$fn = strlen(...);
```

## 4. Fibers
A way to create "green threads" or lightweight coroutines for non-blocking I/O and asynchronous tasks.

## 5. `new` in initializers
Objects can now be used as default parameter values, static variables, and constants.
```php
public function __construct(
    Logger $logger = new NullLogger(),
) {}
```

## 6. Intersection Types
Allow declaring that a parameter must implement multiple interfaces.
```php
public function count(Countable&Iterator $it) { ... }
```

## 7. `never` return type
Used for functions that always throw an exception or exit.
```php
function redirect(string $url): never {
    header('Location: ' . $url);
    exit;
}
```
