# Floating point numbers explained

## Warning from PHP Manual
Floating point numbers have limited precision. Although it depends on the system, PHP typically uses the IEEE 754 double precision format, which will give a maximum relative error due to rounding in the order of 1.11e-16. Non-elementary arithmetic operations may give larger errors, and, of course, error propagation must be considered when several operations are compounded.

Additionally, rational numbers that are exactly representable as floating point numbers in base 10, like 0.1 or 0.7, do not have an exact representation as floating point numbers in base 2, which is used internally, no matter the size of the mantissa. Hence, they cannot be converted into their internal binary counterparts without a small loss of precision. This can lead to confusing results: for example, floor((0.1+0.7)*10) will usually return 7 instead of the expected 8, because the internal representation will be something like 7.9999999999999991118....

So never trust floating point number results to the last digit, and do not compare floating point numbers directly for equality. If higher precision is necessary, the arbitrary precision math functions and gmp functions are available.

## Simple Example (from floating-point-gui.de)
In many programming languages, including PHP:
```php
echo 0.1 + 0.2; // 0.30000000000000004
```
This is because `0.1` and `0.2` cannot be represented exactly in binary.

## How it's avoided: BC Math (Arbitrary Precision Mathematics)
For arbitrary precision mathematics PHP offers the BC Math Binary Calculator which supports numbers of any size and precision, represented as strings.

### BCMath Functions:
- **bcadd** — Add two arbitrary precision numbers
- **bcceil** — Round up arbitrary precision number
- **bccomp** — Compare two arbitrary precision numbers
- **bcdiv** — Divide two arbitrary precision numbers
- **bcdivmod** — Get the quotient and modulus of an arbitrary precision number
- **bcfloor** — Round down arbitrary precision number
- **bcmod** — Get modulus of an arbitrary precision number
- **bcmul** — Multiply two arbitrary precision numbers
- **bcpow** — Raise an arbitrary precision number to another
- **bcpowmod** — Raise an arbitrary precision number to another, reduced by a specified modulus
- **bcround** — Round arbitrary precision number
- **bcscale** — Set or get default scale parameter for all bc math functions
- **bcsqrt** — Get the square root of an arbitrary precision number
- **bcsub** — Subtract one arbitrary precision number from another

### BCMath Usage Example:
```php
<?php
// Set global scale for all BCMath functions
bcscale(3);

$a = '1.234567';
$b = '2.345678';

echo bcadd($a, $b);       // 3.580 (using default scale 3)
echo bcadd($a, $b, 6);    // 3.580245 (explicit scale)
echo bccomp($a, $b, 6);   // -1 (means $a < $b)
echo bcmul($a, '2', 2);   // 2.46
?>
```

## GMP (GNU Multiple Precision)
GMP allows you to work with arbitrary-length integers.

### Important Note on Differences between GMP and BCMath:
- **Number Type Support:** GMP works exclusively on arbitrary precision **integers**, while BCMath supports arbitrary precision **decimal** (floating-point-like) values.
- **Performance:** GMP is significantly **faster** than BCMath.
- **API:** GMP uses a resource-based (or object-based in newer versions) API, while BCMath works primarily with strings.

### Needed GMP Functions:
- **gmp_abs** — Absolute value
- **gmp_add** — Add numbers
- **gmp_cmp** — Compare numbers
- **gmp_div_q** — Divide numbers
- **gmp_div_qr** — Divide numbers and get quotient and remainder
- **gmp_div_r** — Remainder of the division of numbers
- **gmp_init** — Create GMP number from a string or integer
- **gmp_intval** — Convert GMP number to integer
- **gmp_mul** — Multiply numbers
- **gmp_pow** — Raise number into power
- **gmp_strval** — Convert GMP number to string
- **gmp_sub** — Subtract numbers

### GMP Usage Example:
```php
<?php
// Working with large integers
$a = gmp_init("12345678901234567890");
$b = gmp_init("98765432109876543210");

$sum = gmp_add($a, $b);
echo gmp_strval($sum); // 111111111011111111100

// GMP objects support operators (since PHP 5.6+)
$product = $a * $b;
echo gmp_strval($product);

// Comparison
if (gmp_cmp($a, $b) < 0) {
    echo "$a is smaller than $b";
}
?>
```
