---
title: 'Новые возможности PHP 8.0'
slug: '/answers/php80_features'
---

# Новые возможности PHP 8.0

[Официальная документация: релиз PHP 8.0](https://www.php.net/releases/8.0/en.php)

## 1. Именованные аргументы

Позволяют указывать только нужные параметры и не зависеть от их порядка.

```php
htmlspecialchars($string, double_encode: false);
```

## 2. Атрибуты (Annotations)

Использование нативного синтаксиса вместо PHPDoc для метаданных.

```php
#[Route("/api/posts/{id}", methods: ["GET"])]
public function getId($id) { ... }
```

## 3. Продвижение свойств в конструкторе

Объединение объявления свойств класса и конструктора в одну конструкцию.

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

Объявление нескольких возможных типов для переменной.

```php
public function __construct(
    private int|float $number
) {}
```

## 5. Выражение Match

Более безопасная замена `switch()` со строгим сравнением и возвратом значения.

```php
echo match (8.0) {
    '8.0' => "Oh no!",
    8.0   => "This is what I expected",
}; // "This is what I expected"
```

## 6. Nullsafe-оператор (`?->`)

Автоматически проверяет на null на каждом шаге цепочки вызовов.

```php
$country = $session?->user?->getAddress()?->country;
```

## 7. JIT-компиляция (Just-In-Time)

Введены два движка (Tracing и Function) для повышения производительности долгоработающих скриптов.

## 8. Новые функции и классы

- `str_contains()`, `str_starts_with()`, `str_ends_with()`
- `fdiv()`
- `get_debug_type()`
- Класс `WeakMap`
