# HaPHPiness - Лучшее в PHP

Этот гайд вдохновлен ресурсом [haphpiness.com](https://haphpiness.com/) и подчеркивает современные возможности, которые делают PHP отличным языком для разработки.

## Современные возможности языка

### 1. Named Arguments / Именованные аргументы (PHP 8.0)
Именованные аргументы позволяют передавать значения в функцию, указывая имя параметра. Это избавляет от необходимости следить за порядком аргументов.
```php
// До: позиционные аргументы
htmlspecialchars($string, ENT_COMPAT | ENT_HTML401, 'UTF-8', false);

// После: именованные аргументы
htmlspecialchars($string, double_encode: false);
```

### 2. Union Types (PHP 8.0) и Intersection Types (PHP 8.1)
Union Types (объединения) позволяют переменным иметь несколько типов. Intersection Types (пересечения) требуют, чтобы значение удовлетворяло сразу нескольким типам.
```php
// Union types
function process(int|string $input): void {}

// Intersection types
function save(Countable&Iterator $collection): void {}
```

### 3. Enums / Перечисления (PHP 8.1)
Полноценная поддержка перечислений, обеспечивающая типобезопасность для фиксированных наборов значений.
```php
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
}
```

### 4. str_contains(), str_starts_with(), str_ends_with() (PHP 8.0)
Удобные и читаемые функции для стандартных операций со строками.
```php
if (str_contains($url, 'https')) { ... }
if (str_starts_with($file, '/var/www')) { ... }
if (str_ends_with($file, '.php')) { ... }
```

### 5. Array Unpacking with String Keys / Распаковка массивов со строковыми ключами (PHP 8.1)
Оператор расширения (`...`) теперь работает со строковыми ключами, что делает слияние массивов лаконичным.
```php
$config = [...$defaults, ...$custom];
```

### 6. Fibers / Файберы (PHP 8.1)
Легковесные корутины для реализации асинхронных примитивов без "callback hell".
```php
$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('paused');
    echo "Resumed with: $value";
});
```

### 10. Arrow Functions / Стрелочные функции (PHP 7.4)
Краткий синтаксис для коротких замыканий с автоматическим захватом переменных из родительской области видимости.
```php
$doubled = array_map(fn($n) => $n * 2, $numbers);
```

### 11. Match Expressions / Выражения Match (PHP 8.0)
Более мощная и безопасная альтернатива `switch`, использующая строгое сравнение и возвращающая значение.
```php
$text = match($statusCode) {
    200, 201 => 'Success',
    404      => 'Not Found',
    default  => 'Unknown',
};
```

### 12. Null Coalescing Operator ?? и ??= / Оператор объединения с null (PHP 7.0+)
Удобный способ обработки значений по умолчанию и ленивой инициализации.
```php
$username = $_GET['user'] ?? 'anonymous';
$this->logger ??= new NullLogger();
```

### 15. Readonly Properties and Classes / Readonly свойства и классы (PHP 8.1+)
Иммутабельность на уровне движка для свойств и целых классов.
```php
readonly class Money {
    public function __construct(public int $amount, public string $currency) {}
}
```

### 34. Property Hooks / Хуки свойств (PHP 8.4)
Определение логики `get` и `set` прямо при объявлении свойства, что избавляет от шаблонного кода геттеров и сеттеров.
```php
class User {
    public string $fullName {
        get => $this->firstName . ' ' . $this->lastName;
    }
}
```

### 39. Pipe Operator |> / Конвейерный оператор (PHP 8.5)
Поток данных слева направо для цепочек вызовов функций.
```php
$slug = $title
    |> trim(...)
    |> strtolower(...);
```

### 43. #[\NoDiscard] (PHP 8.5)
Предупреждает, если возвращаемое значение функции игнорируется. Важно для результатов валидации или иммутабельных операций.
```php
#[\NoDiscard]
function validate(array $data): bool { ... }
```

### 52. WeakMap (PHP 8.0)
Карты, где ключами являются объекты, которые не препятствуют сборке мусора. Идеально для кэширования данных об объектах.
```php
$cache = new WeakMap();
$cache[$obj] = $computedData;
```

### 59. Numeric Literal Separators / Разделители в числах (PHP 7.4)
Использование нижнего подчеркивания для улучшения читаемости больших чисел.
```php
$population = 8_000_000_000;
```

## Экосистема и производительность

- **Composer:** Лучший менеджер зависимостей в своем классе.
- **OPcache & JIT:** Значительный прирост производительности (JIT добавлен в 8.0).
- **PHPStan & Psalm:** Статический анализ для поиска багов до запуска кода.
- **NativePHP:** Создание десктопных и мобильных приложений на PHP.
- **Symfony & Laravel:** Зрелые и качественные фреймворки.
