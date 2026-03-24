---
title: 'Doctrine ORM & Symfony Database Layer'
slug: '/answers/doctrine'
---

# Doctrine ORM & Symfony Database Layer

Doctrine is a set of PHP libraries focused on database storage and object mapping (ORM).

## 1. Data Mapper Pattern

Unlike Laravel's Eloquent (Active Record), Doctrine uses the **Data Mapper** pattern. This means your entities (PHP classes) are plain objects (POPOs) that don't know how they are saved to the database. The **EntityManager** handles the persistence logic.

## 2. Core Components

- **EntityManager**: The main interface to Doctrine. It is used to persist, flush, find, and remove entities.
- **Unit of Work**: Internal component that keeps track of all objects that are currently "managed" by the EntityManager. When `flush()` is called, it calculates the differences and executes the necessary SQL.
- **Repositories**: Classes that contain custom logic for fetching entities (e.g., `findByEmail`).

## 3. Entity Lifecycle & Events

Doctrine allows you to hook into various stages of an entity's lifecycle:

- `prePersist`, `postPersist`
- `preUpdate`, `postUpdate`
- `preRemove`, `postRemove`
- `postLoad`

These can be handled using **Lifecycle Callbacks** (inside the entity) or **Event Listeners/Subscribers** (separate classes).

## 4. DQL vs DBAL

- **DQL (Doctrine Query Language)**: An object-oriented query language that looks like SQL but works with PHP classes and properties instead of table/column names.
- **DBAL (Database Abstraction Layer)**: A low-level library that provides a consistent API for interacting with different database engines (MySQL, PostgreSQL, etc.) using raw SQL.

## 5. Fetching Strategies

- **Lazy Loading**: Related entities are only loaded from the database when you actually access them (default for collections).
- **Eager Loading**: Related entities are loaded immediately in the same query (using JOINs).

## 6. Common Interview Questions

- **`flush()` vs `persist()`**: `persist()` tells Doctrine to "manage" an object; `flush()` actually executes the SQL commands to save changes to the database.
- **Inheritance Mapping**: Doctrine supports several ways to map class inheritance to database tables:
  - **Mapped Superclass**: Only child classes have tables.
  - **Single Table Inheritance**: All classes in the hierarchy are stored in one table with a "discriminator" column.
  - **Class Table Inheritance**: Each class has its own table, linked by foreign keys.
