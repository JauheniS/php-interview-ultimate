# `$this` vs `self` vs `static` vs `parent`

## `$this`
Ссылается на **текущий экземпляр объекта** в контексте класса. Используется для доступа к нестатическим свойствам и методам. Нельзя использовать вне контекста объекта (например, в статическом методе).

```php
class User {
    public $name = 'John';
    public function getName() {
        return $this->name;
    }
}
```

## `self`
Ссылается на **текущий класс** (тот класс, в котором написан код). Используется для обращения к статическим свойствам, статическим методам и константам класса.

```php
class User {
    public static $count = 0;
    public function increment() {
        self::$count++;
    }
}
```

## `static` (Late Static Binding)
Ссылается на **вызываемый класс** во время выполнения. Используется для доступа к статическим свойствам или методам с учётом наследования. В отличие от `self`, ключевое слово `static` разрешится в дочерний класс, если метод был унаследован и вызван из дочернего класса.

```php
class ParentClass {
    public static function who() {
        echo "ParentClass";
    }
    public static function test() {
        static::who(); // late static binding
        self::who();   // всегда ParentClass
    }
}

class ChildClass extends ParentClass {
    public static function who() {
        echo "ChildClass";
    }
}

ChildClass::test(); // вывод: ChildClass ParentClass
```

## `parent`
Используется для доступа к методам, константам или статическим свойствам **родительского класса** из дочернего класса.

```php
class ChildClass extends ParentClass {
    public function __construct() {
        parent::__construct(); // вызов конструктора родительского класса
    }
}
```
