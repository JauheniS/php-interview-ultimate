---
title: 'Практические примеры архитектуры'
slug: '/answers/architecture_examples'
---

# Практический пример: Гексагональная, Луковая и Чистая архитектуры на PHP

Эти архитектуры преследуют общую цель: **изолировать бизнес-логику («Ядро» или «Core») от внешних деталей реализации**, таких как базы данных, фреймворки и сторонние библиотеки.

Давайте реализуем классический юзкейс (сценарий использования) «Регистрация пользователя», чтобы увидеть эти принципы в действии.

---

## 1. Слой предметной области (Domain Layer / Core)
Это сердце приложения. Здесь сосредоточены бизнес-правила и доменные сущности. Данный слой **не имеет внешних зависимостей**.

```php
namespace App\Domain\Entity;

class User {
    private string $id;
    private string $email;
    private string $password;

    public function __construct(string $id, string $email, string $password) {
        $this->id = $id;
        $this->email = $email;
        $this->password = $password;
    }

    // Доменные методы (бизнес-логика)
    public function changePassword(string $newPassword): void {
        if (strlen($newPassword) < 8) {
            throw new \InvalidArgumentException("Пароль слишком короткий");
        }
        $this->password = $newPassword;
    }

    public function getEmail(): string { return $this->email; }
    public function getId(): string { return $this->id; }
}
```

---

## 2. Порты (Interfaces / Driven Ports)
Ядро определяет свои потребности через интерфейсы. В гексагональной архитектуре они называются **Ведомыми портами (Driven Ports)**.

```php
namespace App\Domain\Repository;

use App\Domain\Entity\User;

interface UserRepositoryInterface {
    public function save(User $user): void;
    public function findByEmail(string $email): ?User;
}
```

---

## 3. Слой приложения (Application Layer / Use Cases)
Этот слой координирует работу доменных объектов для выполнения конкретной задачи. Он зависит только от Domain-слоя.

```php
namespace App\Application\UseCase;

use App\Domain\Entity\User;
use App\Domain\Repository\UserRepositoryInterface;

class RegisterUserUseCase {
    private UserRepositoryInterface $repository;

    public function __construct(UserRepositoryInterface $repository) {
        $this->repository = $repository;
    }

    public function execute(string $email, string $password): void {
        // Проверка бизнес-правила через репозиторий
        if ($this->repository->findByEmail($email)) {
            throw new \Exception("Пользователь уже существует");
        }

        $user = new User(uniqid(), $email, password_hash($password, PASSWORD_BCRYPT));
        $this->repository->save($user);
    }
}
```

---

## 4. Слой инфраструктуры (Adapters / Driven Adapters)
Содержит конкретные реализации (Адаптеры) для работы с внешними системами (БД, почтовые сервисы, внешние API).

```php
namespace App\Infrastructure\Persistence;

use App\Domain\Entity\User;
use App\Domain\Repository\UserRepositoryInterface;
use PDO;

class SqlUserRepository implements UserRepositoryInterface {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }

    public function save(User $user): void {
        $stmt = $this->pdo->prepare("INSERT INTO users (id, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$user->getId(), $user->getEmail(), '...']);
    }

    public function findByEmail(string $email): ?User {
        // Логика SQL-запроса...
        return null; // Упрощённый пример (Mock)
    }
}
```

---

## 5. Слой представления (Driving Adapters)
Точки входа в приложение (контроллеры HTTP, консольные команды CLI).

```php
namespace App\Presentation\Http;

use App\Application\UseCase\RegisterUserUseCase;

class UserController {
    private RegisterUserUseCase $useCase;

    public function __construct(RegisterUserUseCase $useCase) {
        $this->useCase = $useCase;
    }

    public function register(array $requestData): string {
        try {
            $this->useCase->execute($requestData['email'], $requestData['password']);
            return "Пользователь успешно зарегистрирован";
        } catch (\Exception $e) {
            return "Ошибка: " . $e->getMessage();
        }
    }
}
```

---

## Соответствие архитектурным паттернам:

### 1. Hexagonal Architecture (Ports & Adapters)
- **Порты (Ports)**: `UserRepositoryInterface`.
- **Адаптеры (Adapters)**: `SqlUserRepository` (ведомый) и `UserController` (ведущий).
- **Суть**: Мы можем заменить `SqlUserRepository` на `RedisUserRepository`, не меняя ни строчки в бизнес-логике.

### 2. Onion Architecture (Луковая архитектура)
- **Domain Model (Ядро)**: `App\Domain\Entity`.
- **Domain Services/Interfaces**: `App\Domain\Repository`.
- **Application Services**: `App\Application\UseCase`.
- **Outer Layer**: `App\Infrastructure` и `App\Presentation`.
- **Суть**: Направление зависимостей всегда строго внутрь: Инфраструктура -> Приложение -> Домен.

### 3. Clean Architecture (Чистая архитектура)
- **Entities (Сущности)**: `User`.
- **Use Cases (Юзкейсы)**: `RegisterUserUseCase`.
- **Interface Adapters**: `SqlUserRepository`, `UserController`.
- **Frameworks & Drivers**: Сама БД (`PDO`), веб-фреймворк (Laravel, Symfony).

---

## Dependency Injection (Внедрение зависимостей) — Сборка
В реальном приложении за сборку отвечает DI-контейнер. Пример «ручной» сборки в **Composition Root**:

```php
// Точка композиции (Composition Root)
$pdo = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
$repository = new SqlUserRepository($pdo); // Конкретный адаптер инфраструктуры
$useCase = new RegisterUserUseCase($repository); // Наш юзкейс
$controller = new UserController($useCase); // Контроллер презентационного слоя

// Обработка входящего запроса
echo $controller->register(['email' => 'test@example.com', 'password' => 'secret123']);
```
