# `$this` vs `self` vs `static` vs `parent`

## `$this`
Refers to the **current object instance** within a class context. It is used to access non-static properties and methods. You cannot use it outside object context (e.g., in a static method).

```php
class User {
    public $name = 'John';
    public function getName() {
        return $this->name;
    }
}
```

## `self`
Refers to the **current class** (the class where it is written). It is used for static properties, static methods, and class constants.

```php
class User {
    public static $count = 0;
    public function increment() {
        self::$count++;
    }
}
```

## `static` (Late Static Binding)
Refers to the **called class** at runtime. It is used to access static properties or methods while considering class inheritance. Unlike `self`, `static` will resolve to the child class if the method was inherited and called from a child class.

```php
class ParentClass {
    public static function who() {
        echo "ParentClass";
    }
    public static function test() {
        static::who(); // late static binding
        self::who();   // always ParentClass
    }
}

class ChildClass extends ParentClass {
    public static function who() {
        echo "ChildClass";
    }
}

ChildClass::test(); // output: ChildClass ParentClass
```

## `parent`
Used to access methods, constants, or static properties of the **parent class** from within a child class.

```php
class ChildClass extends ParentClass {
    public function __construct() {
        parent::__construct(); // call parent's constructor
    }
}
```
