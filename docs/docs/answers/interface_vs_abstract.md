---
title: "Interface vs Abstract Class"
slug: "/answers/interface_vs_abstract"
---

# Interface vs Abstract Class

## Interface
An **interface** is an OOP element that groups a set of function declarations without implementing them. It specifies the contract (the "what") that a class must fulfill.

### Rules
- Cannot contain any implementation of methods.
- All methods must be public.
- Cannot contain variables/properties (but can have constants).
- A class can implement multiple interfaces.

```php
interface Animal {
    public function makeSound();
}

class Dog implements Animal {
    public function makeSound() {
        echo "Bark";
    }
}
```

## Abstract Class
An **abstract class** is like a partially built class. It can contain both abstract methods (which must be implemented by children) and regular methods (which provide default behavior).

### Rules
- Can contain both abstract and concrete methods.
- Methods can be `public`, `protected`, or `private` (abstract methods can't be private).
- Can contain properties (variables).
- A class can extend only one abstract class.
- You cannot instantiate an abstract class.

```php
abstract class Animal {
    public $name;
    
    // Abstract method: no body
    abstract public function makeSound();
    
    // Concrete method: has body
    public function sleep() {
        echo "Sleeping...";
    }
}
```

## Comparison Table

| Feature | Interface | Abstract Class |
| :--- | :--- | :--- |
| **Inheritance** | A class can implement multiple interfaces. | A class can extend only one abstract class. |
| **Methods** | Only method signatures, no body. | Can have both abstract and concrete methods. |
| **Properties** | No properties (constants only). | Can have properties. |
| **Visibility** | All methods must be public. | Methods can be public, protected. |
| **Purpose** | To define a contract (behavior). | To provide a base for a group of classes. |
