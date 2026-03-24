---
title: 'PHP 8.3 New Features'
slug: '/answers/php83_features'
---

# PHP 8.3 New Features

[Official Documentation: PHP 8.3 Release](https://www.php.net/releases/8.3/en.php)

## 1. Typed Class Constants

Class constants can now have type declarations.

```php
class User {
    const string ROLE = 'admin';
}
```

## 2. Dynamic Class Constant Fetch

Simplified syntax for fetching class constants dynamically.

```php
$searchable = 'ROLE';
echo User::{$searchable};
```

## 3. `#[Override]` Attribute

Ensures that a method with the same name exists in a parent class or interface. It helps catch typos during refactoring.

```php
class ParentClass {
    public function sayHello() {}
}

class ChildClass extends ParentClass {
    #[Override]
    public function sayHello() {} // OK
}
```

## 4. Deep Cloning of Readonly Properties

Allows modification of readonly properties once within the `__clone()` magic method.

```php
readonly class User {
    public function __construct(public DateTime $date) {}
    public function __clone() {
        $this->date = clone $this->date; // Allowed in 8.3
    }
}
```

## 5. `json_validate()` function

Checks if a string is a valid JSON without decoding it (uses less memory).

```php
if (json_validate($jsonString)) {
    // string is valid JSON
}
```

## 6. Randomizer Improvements

- New `Randomizer::getBytesFromString()`
- New `Randomizer::getFloat()`
- New `Randomizer::nextFloat()`
