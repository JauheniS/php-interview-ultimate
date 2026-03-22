---
title: "PHP 8.0 New Features"
slug: "/answers/php80_features"
---

# PHP 8.0 New Features

[Official Documentation: PHP 8.0 Release](https://www.php.net/releases/8.0/en.php)

## 1. Named Arguments
Specify only required parameters and make them order-independent.
```php
htmlspecialchars($string, double_encode: false);
```

## 2. Attributes (Annotations)
Use native syntax instead of PHPDoc for metadata.
```php
#[Route("/api/posts/{id}", methods: ["GET"])]
public function getId($id) { ... }
```

## 3. Constructor Property Promotion
Combine class properties and constructors into one.
```php
class Point {
    public function __construct(
        public float $x = 0.0,
        public float $y = 0.0,
        public float $z = 0.0,
    ) {}
}
```

## 4. Union Types
Declare multiple possible types for a variable.
```php
public function __construct(
    private int|float $number
) {}
```

## 5. Match Expression
A safer replacement for `switch()` with strict comparisons and a return value.
```php
echo match (8.0) {
    '8.0' => "Oh no!",
    8.0   => "This is what I expected",
}; // "This is what I expected"
```

## 6. Nullsafe Operator (`?->`)
Automatically checks for null at each step of a method chain.
```php
$country = $session?->user?->getAddress()?->country;
```

## 7. Just-In-Time (JIT) Compilation
Introduced two engines (Tracing and Function) to increase performance for long-running scripts.

## 8. New Functions and Classes
- `str_contains()`, `str_starts_with()`, `str_ends_with()`
- `fdiv()`
- `get_debug_type()`
- `WeakMap` class
