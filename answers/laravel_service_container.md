# Laravel Service Container

The Service Container is a powerful tool for managing class dependencies and performing dependency injection. It is the heart of any Laravel application.

## Key Concepts
### 1. Dependency Injection
Instead of an object creating its own dependencies, they are "injected" from the outside, usually through the constructor.

### 2. Binding
Telling the container how to resolve a specific class or interface. This is done in **Service Providers**.

#### Simple Binding
```php
$this->app->bind(FileStorage::class, function ($app) {
    return new FileStorage('/var/www/uploads');
});
```

#### Singleton Binding
Ensures the class is only resolved once, and the same instance is returned for subsequent requests.
```php
$this->app->singleton(PaymentGateway::class, function ($app) {
    return new StripePaymentGateway(config('services.stripe.key'));
});
```

### 3. Resolving
Asking the container for an instance of a class.
```php
$storage = app(FileStorage::class);
```
Most of the time, Laravel automatically resolves dependencies through constructor injection.

## Why use the Service Container?
- **Loose Coupling:** Makes it easy to swap implementations (e.g., swapping `LocalFileStorage` with `S3FileStorage` by changing one line in the Service Provider).
- **Testability:** You can easily "mock" dependencies by binding a fake implementation during tests.
- **Bootstrapping:** Handles the complex creation of objects that require many parameters.

## Difference between Service Container and Service Providers
- **Service Container:** The "box" that holds all the bindings and handles resolution.
- **Service Providers:** The "instruction manuals" that tell Laravel how to put things into the container.
