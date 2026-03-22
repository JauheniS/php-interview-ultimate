# Software Design & Architecture Concepts

## Object-Oriented Programming (OOP) Fundamentals

### Invariance, Covariance, and Contravariance
These terms describe how subtyping between complex types (like return types or parameter types) relates to subtyping between their component types.

- **Invariance**: The type must match exactly.
- **Covariance**: Allows a child class to return a *more specific* type than the parent (e.g., `parent::make(): Animal` can be overridden by `child::make(): Dog`). Supported in PHP 7.4+ for return types.
- **Contravariance**: Allows a child class to accept a *less specific* (wider) type than the parent (e.g., `parent::eat(Dog)` can be overridden by `child::eat(Animal)`). Supported in PHP 7.4+ for parameter types.

### Composition vs Inheritance
- **Inheritance** ("is-a" relationship): Use when a class is a specialized version of another. Risk: Fragile Base Class problem, tight coupling.
- **Composition** ("has-a" relationship): Use when a class uses another class to perform a task. Benefit: More flexible, easier to change at runtime, lower coupling.
- **Rule of Thumb**: "Favor composition over inheritance."

### Why Getters and Setters are considered "Bad" (sometimes)
Overusing them can lead to **Anemic Domain Models**, where objects are just bags of data (DSPs - Data Structure Projections) with no behavior. It violates **Encapsulation** because you expose the internal state of the object.
- **Better Approach**: "Tell, Don't Ask." Instead of getting a value, performing logic, and setting it back, tell the object to perform the action itself.

---

## Service Locator vs Inversion of Control (IoC) Container

- **Service Locator**: A pattern where an object "reaches out" to a central registry to find its dependencies.
  - *Cons*: Hidden dependencies, harder to test, violates Dependency Inversion.
- **IoC Container (Dependency Injection)**: Dependencies are "pushed" into the object (via constructor or setter). The object is passive and doesn't know how its dependencies are created.
  - *Pros*: Explicit dependencies, easier to mock/test, decoupled code.

---

## GRASP (General Responsibility Assignment Software Patterns)
A set of 9 patterns/principles for assigning responsibilities to classes.
- **Information Expert**: Assign responsibility to the class that has the information necessary to fulfill it.
- **Creator**: Who should be responsible for creating a new instance of some class?
- **Controller**: Who should handle a system event?
- **Low Coupling**: Keep classes as independent as possible.
- **High Cohesion**: Keep related logic together in one class.
- **Indirection**: Use an intermediate object to decouple two components.
- **Polymorphism**: Handle alternatives based on type.
- **Pure Fabrication**: Create a class that doesn't represent a domain concept to achieve low coupling/high cohesion (e.g., a Service).
- **Protected Variations**: Protect elements from variations of other elements by wrapping the focus of instability with an interface.

---

## Architecture Principles

### Law of Demeter (Principle of Least Knowledge)
"Talk only to your immediate friends." An object should not "reach through" another object to get to a third object (e.g., avoid `$user->getAccount()->getTransactions()->getFirst()`).

### Anemic Domain Model
A domain model where objects have state (properties) but little or no logic (behavior). Logic is instead found in "Service" classes. This is often considered an anti-pattern in DDD.

### DDD (Domain-Driven Design)
An approach to software development that prioritizes the core domain and domain logic.
- **Entity**: An object with a unique identity that persists over time (e.g., a User).
- **Value Object**: An object defined by its attributes, with no identity (e.g., an Address, Money). They should be immutable.
- **DTO (Data Transfer Object)**: A simple object used to pass data between layers (no logic).

---

## Hexagonal (Ports & Adapters) vs Onion Architecture
Both aim to decouple the application core (business logic) from external concerns (DB, API, UI).
- **Application Core**: Contains domain logic and is independent of external tools.
- **Ports**: Interfaces defined by the core for what it needs (e.g., `UserRepositoryInterface`).
- **Adapters**: Concrete implementations of those interfaces (e.g., `DoctrineUserRepository`).
- **Onion**: Emphasizes layers where "Dependencies point inwards." The innermost layer is the Domain Model.
