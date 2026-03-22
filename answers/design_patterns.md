# Design Patterns in PHP

Design patterns are typical solutions to common problems in software design. Each pattern is like a blueprint that you can customize to solve a particular design problem in your code.

## Main Types of Design Patterns

### 1. Creational Patterns
These patterns provide various object creation mechanisms, which increase flexibility and reuse of existing code.
- **Singleton**: Ensures that a class has only one instance, while providing a global access point to this instance.
- **Factory Method**: Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.
- **Abstract Factory**: Lets you produce families of related objects without specifying their concrete classes.
- **Builder**: Lets you construct complex objects step by step.
- **Prototype**: Lets you copy existing objects without making your code dependent on their classes.

### 2. Structural Patterns
These patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.
- **Adapter**: Allows objects with incompatible interfaces to collaborate.
- **Bridge**: Lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.
- **Composite**: Lets you compose objects into tree structures and then work with these structures as if they were individual objects.
- **Decorator**: Lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
- **Facade**: Provides a simplified interface to a library, a framework, or any other complex set of classes.
- **Flyweight**: Lets you fit more objects into the available amount of RAM by sharing common parts of state between multiple objects instead of keeping all of the data in each object.
- **Proxy**: Lets you provide a substitute or placeholder for another object.

### 3. Behavioral Patterns
These patterns are concerned with algorithms and the assignment of responsibilities between objects.
- **Chain of Responsibility**: Lets you pass requests along a chain of handlers.
- **Command**: Turns a request into a stand-alone object that contains all information about the request.
- **Iterator**: Lets you traverse elements of a collection without exposing its underlying representation.
- **Mediator**: Lets you reduce chaotic dependencies between objects.
- **Memento**: Lets you save and restore the previous state of an object without revealing the details of its implementation.
- **Observer**: Lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they’re observing.
- **State**: Lets an object alter its behavior when its internal state changes.
- **Strategy**: Lets you define a family of algorithms, put each of them into a separate class, and make their objects interchangeable.
- **Template Method**: Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.
- **Visitor**: Lets you separate algorithms from the objects on which they operate.
