---
title: 'Новые возможности PHP 8.3'
slug: '/answers/php83_features'
---

# Новые возможности PHP 8.3

[Официальная документация: релиз PHP 8.3](https://www.php.net/releases/8.3/en.php)

## 1. Типизированные константы классов

Константы классов теперь могут иметь объявление типа.

```php
class User {
    const string ROLE = 'admin';
}
```

## 2. Динамическое получение констант класса

Упрощённый синтаксис для динамического обращения к константам класса.

```php
$searchable = 'ROLE';
echo User::{$searchable};
```

## 3. Атрибут `#[Override]`

Гарантирует, что метод с таким же именем существует в родительском классе или интерфейсе. Помогает отлавливать опечатки при рефакторинге.

```php
class ParentClass {
    public function sayHello() {}
}

class ChildClass extends ParentClass {
    #[Override]
    public function sayHello() {} // OK
}
```

## 4. Глубокое клонирование readonly-свойств

Позволяет однократно модифицировать readonly-свойства внутри магического метода `__clone()`.

```php
readonly class User {
    public function __construct(public DateTime $date) {}
    public function __clone() {
        $this->date = clone $this->date; // Допустимо в 8.3
    }
}
```

## 5. Функция `json_validate()`

Проверяет, является ли строка валидным JSON, без декодирования (использует меньше памяти).

```php
if (json_validate($jsonString)) {
    // строка содержит валидный JSON
}
```

## 6. Улучшения Randomizer

- Новый метод `Randomizer::getBytesFromString()`
- Новый метод `Randomizer::getFloat()`
- Новый метод `Randomizer::nextFloat()`
