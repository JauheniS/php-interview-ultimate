# Новые возможности PHP 8.1

[Официальная документация: релиз PHP 8.1](https://www.php.net/releases/8.1/en.php)

## 1. Перечисления (Enums)
Нативная поддержка перечислений.
```php
enum Status {
    case Draft;
    case Published;
    case Archived;
}
```

## 2. Readonly-свойства
Свойства, которые нельзя изменить после инициализации.
```php
class BlogData {
    public readonly Status $status;
    public function __construct(Status $status) {
        $this->status = $status;
    }
}
```

## 3. First-class Callable Syntax
Упрощённый синтаксис для получения ссылки на любую функцию.
```php
$fn = strlen(...);
```

## 4. Fibers
Способ создания «зелёных потоков» — легковесных корутин для неблокирующего ввода-вывода и асинхронных задач.

## 5. `new` в инициализаторах
Объекты теперь могут использоваться в качестве значений параметров по умолчанию, статических переменных и констант.
```php
public function __construct(
    Logger $logger = new NullLogger(),
) {}
```

## 6. Intersection Types
Позволяют объявить, что параметр должен реализовывать несколько интерфейсов.
```php
public function count(Countable&Iterator $it) { ... }
```

## 7. Тип возврата `never`
Используется для функций, которые всегда выбрасывают исключение или завершают выполнение.
```php
function redirect(string $url): never {
    header('Location: ' . $url);
    exit;
}
```
