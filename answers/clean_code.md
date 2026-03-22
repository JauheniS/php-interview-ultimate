# Clean Code & Programming Best Practices

"Clean Code" by Robert C. Martin provides principles and practices for writing readable, maintainable software.

## 1. General Rules
- **Meaningful Names**: Choose names that reveal intention. Avoid `temp` or `a1`.
- **Functions Should Be Small**: Do one thing and do it well (Single Responsibility).
- **Function Arguments**: Ideally 0-2; avoid more than 3.
- **DRY (Don't Repeat Yourself)**: Avoid duplicated logic.
- **KISS (Keep It Simple, Stupid)**: Don't overengineer.
- **YAGNI (You Ain't Gonna Need It)**: Don't write code for features you might need in the future.

## 2. Comments
- Only use comments when you can't express yourself in code.
- Avoid "noise" comments like `// increment i`.
- Use `TODO` sparingly.

## 3. Error Handling
- Use **Exceptions** instead of error codes.
- Don't return `null` if possible (use Null Object pattern or throw exceptions).
- Wrap third-party APIs to isolate them from your core logic.

## 4. SOLID Principles (Quick Recap)
- **S**: Single Responsibility
- **O**: Open/Closed
- **L**: Liskov Substitution
- **I**: Interface Segregation
- **D**: Dependency Inversion
[Detailed SOLID Guide](solid_principles.md)

## 5. Other Best Practices
- **Early Return**: Instead of deep `if-else` nesting, return early.
- **Composition over Inheritance**: Prefer building objects from other objects rather than deep inheritance chains.
- **Boy Scout Rule**: Always leave the code cleaner than you found it.
