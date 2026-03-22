---
title: "Method Overloading in PHP"
slug: "/answers/method_overloading"
---

# Method Overloading in PHP

In traditional object-oriented languages (like Java or C++), method overloading allows you to define multiple methods with the same name but different parameters. 

**PHP does not support traditional method overloading.** If you try to define two methods with the same name in a class, PHP will throw a fatal error.

## How PHP Simulates Overloading
PHP uses "Magic Methods" to provide similar functionality dynamically. The most common way to simulate method overloading is using `__call()` and `__callStatic()`.

### Example using `__call()`
This method is triggered when invoking an inaccessible method in an object context.

```php
class Calculator {
    public function __call($name, $arguments) {
        if ($name === 'add') {
            if (count($arguments) === 2) {
                return $arguments[0] + $arguments[1];
            } elseif (count($arguments) === 3) {
                return $arguments[0] + $arguments[1] + $arguments[2];
            }
        }
    }
}

$calc = new Calculator();
echo $calc->add(1, 2);    // 3
echo $calc->add(1, 2, 3); // 6
```

### Why use this?
It's useful for:
- API wrappers where the methods are dynamic.
- Proxy patterns.
- Flexible interfaces where the number of arguments can vary significantly.

## Difference between Overloading and Overriding
- **Overloading:** Same method name, different parameters (Simulated in PHP).
- **Overriding:** Same method name and parameters, but different implementation in a child class (Fully supported in PHP).
