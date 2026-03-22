---
title: "PHP 8.4 New Features"
slug: "/answers/php84_features"
---

# PHP 8.4 New Features

[Official Documentation: PHP 8.4 Release](https://www.php.net/releases/8.4/en.php)

## 1. Property Hooks

Property hooks provide support for computed properties that can natively be understood by IDEs and static analysis tools. They allow reliable pre- or post-processing of values, without needing to check whether a matching getter or setter exists in the class.

```php
class User {
    public string $first_name;
    public string $last_name;

    public string $full_name {
        get => "{$this->first_name} {$this->last_name}";
        set (string $value) {
            [$this->first_name, $this->last_name] = explode(' ', $value, 2);
        }
    }
}
```

## 2. Asymmetric Visibility

Properties can now have different visibility for reading and writing.

```php
class User {
    public private(set) string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }
}

$user = new User('John');
echo $user->name; // OK
// $user->name = 'Jane'; // Error: Cannot modify private(set) property
```

## 3. New `array_*()` functions

New functions `array_find()`, `array_find_key()`, `array_any()`, and `array_all()` are available.

```php
$animal = array_find(
    ['dog', 'cat', 'cow', 'duck', 'goose'],
    static fn(string $value): bool => str_starts_with($value, 'c'),
);
// $animal is "cat"
```

## 4. Instantiating classes without extra parentheses

Simplified syntax for instantiating classes and calling methods/properties.

```php
// Before PHP 8.4
$name = (new User('John'))->name;

// PHP 8.4
$name = new User('John')->name;
```

## 5. `#[Deprecated]` attribute

A standard way to mark functions, methods, and class constants as deprecated.

```php
class OldSystem {
    #[Deprecated(since: '1.1', message: 'Use NewSystem::doSomething instead')]
    public function doSomething() {}
}
```

## 6. New `mb_trim()`, `mb_ltrim()`, and `mb_rtrim()` functions

Multibyte versions of the standard `trim` functions.

## 7. `DateTime::createFromTimestamp()`

A simpler way to create `DateTime` and `DateTimeImmutable` objects from a Unix timestamp.

```php
$dt = DateTimeImmutable::createFromTimestamp(1715635200);
```

## 8. Bcrypt default cost increase

Default Bcrypt cost changed from `10` to `12`.

## 9. `request_parse_body()`

A new function to parse `multipart/form-data` and `application/x-www-form-urlencoded` request bodies manually.

## 10. `exit`/`die` changed from language constructs to functions

This allows them to be passed to higher-order functions and improves consistency.

## 11. Implicitly nullable parameter declarations deprecated

Declaring a parameter with a default value of `null` without explicitly making it nullable is now deprecated.

```php
// Deprecated in 8.4
function save(string $name = null) {}

// Correct in 8.4
function save(?string $name = null) {}
```
