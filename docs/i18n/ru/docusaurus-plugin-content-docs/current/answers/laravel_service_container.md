---
title: 'Laravel Service Container'
slug: '/answers/laravel_service_container'
---

# Laravel Service Container

Service Container — мощный инструмент для управления зависимостями классов и выполнения Dependency Injection. Он является ядром любого приложения на Laravel.

## Ключевые концепции

### 1. Dependency Injection

Вместо того чтобы объект сам создавал свои зависимости, они «внедряются» извне — как правило, через конструктор.

### 2. Привязка (Binding)

Указание контейнеру, как разрешать конкретный класс или интерфейс. Это делается в **Service Providers**.

#### Простая привязка

```php
$this->app->bind(FileStorage::class, function ($app) {
    return new FileStorage('/var/www/uploads');
});
```

#### Singleton-привязка

Гарантирует, что класс будет разрешён только один раз, а при последующих запросах будет возвращён тот же экземпляр.

```php
$this->app->singleton(PaymentGateway::class, function ($app) {
    return new StripePaymentGateway(config('services.stripe.key'));
});
```

### 3. Разрешение (Resolving)

Запрос экземпляра класса у контейнера.

```php
$storage = app(FileStorage::class);
```

В большинстве случаев Laravel автоматически разрешает зависимости через Constructor Injection.

## Зачем использовать Service Container?

- **Слабая связанность (Loose Coupling):** позволяет легко заменять реализации (например, заменить `LocalFileStorage` на `S3FileStorage`, изменив одну строку в Service Provider).
- **Тестируемость:** можно легко «замокать» зависимости, привязав фейковую реализацию во время тестирования.
- **Инициализация:** берёт на себя создание объектов со сложной конфигурацией и множеством параметров.

## Разница между Service Container и Service Providers

- **Service Container:** «ящик», который хранит все привязки и выполняет разрешение зависимостей.
- **Service Providers:** «инструкции», которые сообщают Laravel, как помещать объекты в контейнер.
