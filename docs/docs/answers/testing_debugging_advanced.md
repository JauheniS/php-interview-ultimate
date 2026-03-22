---
title: "Advanced Testing & Debugging"
slug: "/answers/testing_debugging_advanced"
---

# Advanced Testing & Debugging

## Testing Concepts
- **TDD (Test-Driven Development)**: Red-Green-Refactor cycle. Tests are written *before* the code.
- **BDD (Behavior-Driven Development)**: Focuses on the behavior of the application from the user's perspective (often using "Given, When, Then" syntax).
- **Mutational Testing**: Changing parts of the code (mutations) to see if tests fail. If they don't, it means the test suite is weak. Tools: **Infection** for PHP.

## Advanced Mocking (PHPUnit)
- **Mocks vs Stubs**: Stubs return fixed values; Mocks expect certain interactions.
- **Mocking Static Methods**: Use **Mockery** or PHPUnit's `createMock()` for some cases. Static methods are hard to mock, often indicating a need for refactoring.
- **Mocking Final Classes/Methods**: Not directly possible with PHPUnit. Solutions include **DG/Bypass-Finals** or using interfaces.
- **Mocking Internal Objects**: Refactor to use **Dependency Injection** (injecting the dependency) or use a **Factory**.
- **Mocking External APIs**:
  1. Use **Guzzle Mock Handler**.
  2. Use a local mock server or a service like **WireMock**.

---

## Debugging: The 9 Indispensable Rules
These rules are based on David Agans' book "Debugging":
1. **Understand the System**: Read the docs, know how it works.
2. **Make It Fail**: Reproduce the bug consistently.
3. **Quit Thinking and Look**: Observe the actual state, don't just guess.
4. **Divide and Conquer**: Narrow down where the bug could be.
5. **Change One Thing at a Time**: Isolating variables is key.
6. **Keep an Audit Trail**: Write down what you've tried and found.
7. **Check the Plug**: Verify the basics (environment, config).
8. **Get a Fresh View**: Ask a colleague for help (Rubber ducking).
9. **If You Didn't Fix It, It Isn't Fixed**: Verify the fix multiple times.
