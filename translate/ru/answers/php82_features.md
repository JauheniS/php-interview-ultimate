# Новые возможности PHP 8.2

[Официальная документация: релиз PHP 8.2](https://www.php.net/releases/8.2/en.php)

## 1. Readonly-классы
Помечает весь класс как readonly, автоматически делая все его свойства доступными только для чтения.
```php
readonly class User {
    public function __construct(
        public string $name,
        public string $email,
    ) {}
}
```

## 2. Типы в дизъюнктивной нормальной форме (DNF Types)
Позволяют комбинировать union- и intersection-типы. Intersection-типы должны быть сгруппированы в скобках.
```php
public function process((A&B)|null $entity) { ... }
```

## 3. `null`, `false` и `true` как самостоятельные типы
Теперь могут использоваться как отдельные типы возвращаемых значений.
```php
public function alwaysFalse(): false { return false; }
```

## 4. Новое расширение «Random»
Новый объектно-ориентированный API для генерации случайных чисел, заменяющий глобально инициализируемый генератор.
```php
use Random\Randomizer;
$randomizer = new Randomizer();
echo $randomizer->getInt(1, 100);
```

## 5. Константы в Traits
Traits теперь могут определять константы. Доступ к ним осуществляется через класс, использующий данный trait.
```php
trait Foo {
    public const BAR = 'baz';
}
class MyClass {
    use Foo;
}
echo MyClass::BAR;
```

## 6. Устаревание динамических свойств
Создание свойств, не объявленных в классе, теперь помечено как устаревшее (deprecated), если класс явно не разрешает это с помощью атрибута `#[AllowDynamicProperties]`. На `stdClass` это не распространяется.

## 7. Новые функции и классы
- `mysqli_execute_query()`
- Атрибут `#[SensitiveParameter]` для скрытия конфиденциальных данных в трассировках стека.
- `json_validate()` (на самом деле это функция из 8.3)
- `memory_reset_peak_usage()`
