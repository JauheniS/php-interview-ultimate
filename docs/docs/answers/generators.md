---
title: 'PHP Generators and `yield`'
slug: '/answers/generators'
---

# PHP Generators and `yield`

Generators provide an easy way to implement simple iterators without the overhead or complexity of implementing a class that implements the `Iterator` interface.

## What is a generator?

A generator function looks just like a normal function, except that instead of returning a value, a generator yields as many values as it needs to. Any function containing `yield` is a generator function.

When a generator function is called, it returns an object that can be iterated over. When you iterate over that object (e.g., via a `foreach` loop), PHP will call the object's iteration methods each time it needs a value, then saves the state of the generator when it yields a value so that it can be resumed when the next value is required.

## Benefits

The main benefit is memory efficiency. You can iterate over a large set of data without needing to build an array in memory.

## Basic Example

```php
function get_numbers() {
    for ($i = 1; $i <= 3; $i++) {
        yield $i;
    }
}

foreach (get_numbers() as $number) {
    echo $number; // 123
}
```

## `yield from`

Generator delegation allows you to yield values from another generator, Traversable object, or array by using the `yield from` keyword.

```php
function count_to_ten() {
    yield 1;
    yield 2;
    yield from [3, 4];
    yield from count_rest();
}

function count_rest() {
    yield 5;
    // ...
}
```
