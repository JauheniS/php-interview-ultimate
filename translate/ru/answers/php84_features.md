# Новые возможности PHP 8.4

[Официальная документация: релиз PHP 8.4](https://www.php.net/releases/8.4/en.php)

## 1. Property Hooks

Property hooks обеспечивают поддержку вычисляемых свойств, которые нативно распознаются IDE и инструментами статического анализа. Они позволяют надёжно выполнять пре- и постобработку значений без необходимости проверять наличие соответствующего геттера или сеттера в классе.

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

## 2. Асимметричная видимость

Свойства теперь могут иметь разную видимость для чтения и записи.

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

## 3. Новые функции `array_*()`

Доступны новые функции `array_find()`, `array_find_key()`, `array_any()` и `array_all()`.

```php
$animal = array_find(
    ['dog', 'cat', 'cow', 'duck', 'goose'],
    static fn(string $value): bool => str_starts_with($value, 'c'),
);
// $animal is "cat"
```

## 4. Создание экземпляров классов без лишних скобок

Упрощённый синтаксис создания экземпляров классов и вызова методов/свойств.

```php
// Before PHP 8.4
$name = (new User('John'))->name;

// PHP 8.4
$name = new User('John')->name;
```

## 5. Атрибут `#[Deprecated]`

Стандартный способ пометить функции, методы и константы классов как устаревшие.

```php
class OldSystem {
    #[Deprecated(since: '1.1', message: 'Use NewSystem::doSomething instead')]
    public function doSomething() {}
}
```

## 6. Новые функции `mb_trim()`, `mb_ltrim()` и `mb_rtrim()`

Многобайтовые версии стандартных функций `trim`.

## 7. `DateTime::createFromTimestamp()`

Упрощённый способ создания объектов `DateTime` и `DateTimeImmutable` из Unix-метки времени.

```php
$dt = DateTimeImmutable::createFromTimestamp(1715635200);
```

## 8. Увеличение стоимости Bcrypt по умолчанию

Значение cost для Bcrypt по умолчанию изменено с `10` на `12`.

## 9. `request_parse_body()`

Новая функция для ручного парсинга тел запросов `multipart/form-data` и `application/x-www-form-urlencoded`.

## 10. `exit`/`die` изменены с языковых конструкций на функции

Это позволяет передавать их в функции высшего порядка и повышает согласованность языка.

## 11. Неявно nullable-объявления параметров объявлены устаревшими

Объявление параметра со значением по умолчанию `null` без явного указания nullable-типа теперь считается устаревшим.

```php
// Deprecated in 8.4
function save(string $name = null) {}

// Correct in 8.4
function save(?string $name = null) {}
```
