# HaPHPiness - Best things in PHP

This guide is inspired by [haphpiness.com](https://haphpiness.com/), highlighting the modern features that make PHP a great language to work with.

## Modern Language Features

### 1. Named Arguments (PHP 8.0)
Named arguments allow you to pass values to a function by specifying the parameter name, so that you don't have to rely on their order.
```php
// Before: positional arguments
htmlspecialchars($string, ENT_COMPAT | ENT_HTML401, 'UTF-8', false);

// After: named arguments
htmlspecialchars($string, double_encode: false);
```

### 2. Union Types (PHP 8.0) and Intersection Types (PHP 8.1)
Union types allow variables to have more than one type. Intersection types require a value to satisfy multiple type constraints.
```php
// Union types
function process(int|string $input): void {}

// Intersection types
function save(Countable&Iterator $collection): void {}
```

### 3. Enums (PHP 8.1)
First-class support for enumerations, providing type safety for fixed sets of values.
```php
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
}
```

### 4. str_contains(), str_starts_with(), str_ends_with() (PHP 8.0)
Consistent and readable functions for common string operations.
```php
if (str_contains($url, 'https')) { ... }
if (str_starts_with($file, '/var/www')) { ... }
if (str_ends_with($file, '.php')) { ... }
```

### 5. Array Unpacking with String Keys (PHP 8.1)
The spread operator now works with string keys, making array merging clean and expressive.
```php
$config = [...$defaults, ...$custom];
```

### 6. Fibers (PHP 8.1)
Lightweight, cooperatively-scheduled coroutines for building async primitives.
```php
$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('paused');
    echo "Resumed with: $value";
});
```

### 10. Arrow Functions (PHP 7.4)
Concise syntax for short closures with automatic variable capture from parent scope.
```php
$doubled = array_map(fn($n) => $n * 2, $numbers);
```

### 11. Match Expressions (PHP 8.0)
A more powerful and safer alternative to `switch`, providing strict comparison and returning a value.
```php
$text = match($statusCode) {
    200, 201 => 'Success',
    404      => 'Not Found',
    default  => 'Unknown',
};
```

### 12. Null Coalescing Operator ?? and ??= (PHP 7.0+)
Clean way to handle defaults and lazy initialization.
```php
$username = $_GET['user'] ?? 'anonymous';
$this->logger ??= new NullLogger();
```

### 15. Readonly Properties and Classes (PHP 8.1+)
Engine-enforced immutability for properties and entire classes.
```php
readonly class Money {
    public function __construct(public int $amount, public string $currency) {}
}
```

### 34. Property Hooks (PHP 8.4)
Define `get` and `set` behavior directly on property declarations, eliminating getter/setter boilerplate.
```php
class User {
    public string $fullName {
        get => $this->firstName . ' ' . $this->lastName;
    }
}
```

### 39. Pipe Operator |> (PHP 8.5)
Left-to-right data flow for function chaining.
```php
$slug = $title
    |> trim(...)
    |> strtolower(...);
```

### 43. #[\NoDiscard] (PHP 8.5)
Warns when the return value of a function is ignored, essential for validation results or immutable operations.
```php
#[\NoDiscard]
function validate(array $data): bool { ... }
```

### 52. WeakMap (PHP 8.0)
Maps with objects as keys that don't prevent garbage collection, perfect for per-object caches.
```php
$cache = new WeakMap();
$cache[$obj] = $computedData;
```

### 59. Numeric Literal Separators (PHP 7.4)
Use underscores to make large numbers more readable.
```php
$population = 8_000_000_000;
```

## Ecosystem and Performance

- **Composer:** Best-in-class dependency management.
- **OPcache & JIT:** Significant performance boosts (JIT added in 8.0).
- **PHPStan & Psalm:** Static analysis for catching bugs before runtime.
- **NativePHP:** Build desktop and mobile apps with PHP.
- **Symfony & Laravel:** Mature, high-quality frameworks.
