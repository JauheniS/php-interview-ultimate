---
title: "Web & Security Concepts"
slug: "/answers/web_security"
---

# Web & Security Concepts

## REST API vs JSON-RPC
- **REST (REpresentational State Transfer)**: Resource-based architecture that uses standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`). It is stateless and leverages HTTP features like caching.
- **JSON-RPC**: A protocol that focuses on actions (calling methods) rather than resources. It usually uses `POST` for everything and contains the method and parameters in the body.

## HTTP Status Groups
- **1xx**: Informational.
- **2xx**: Success (e.g., `200 OK`, `201 Created`, `204 No Content`).
- **3xx**: Redirection (e.g., `301 Moved Permanently`, `302 Found`, `304 Not Modified`).
- **4xx**: Client Error (e.g., `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`).
- **5xx**: Server Error (e.g., `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`).

## Security (OWASP Top 10)
Common web vulnerabilities and their preventions:
1. **Injection** (e.g., SQL Injection): Prevent by using prepared statements and parameterized queries.
2. **Broken Authentication**: Use multi-factor authentication and strong password hashing (e.g., `bcrypt`, `argon2`).
3. **Cross-Site Scripting (XSS)**: Prevent by escaping all user-generated content before rendering it in the browser.
4. **Cross-Site Request Forgery (CSRF)**: Prevent by using unique CSRF tokens for all state-changing requests.
5. **CORS (Cross-Origin Resource Sharing)**: A security mechanism that allows a server to specify which other origins are allowed to access its resources.

## Authentication vs Authorization
- **Authentication**: Verifying **who** the user is (e.g., login).
- **Authorization**: Verifying **what** the user is allowed to do (e.g., permissions, roles).

## JWT (JSON Web Tokens)
JWT is a compact, URL-safe means of representing claims between two parties.
- **Expiration**: JWTs should have an `exp` claim to expire after a certain time.
- **Revocation**: Since JWTs are stateless, revoking them is difficult. Common strategies:
  - **Short TTL**: Use very short expiration times.
  - **Refresh Tokens**: Use a persistent refresh token to issue new JWTs.
  - **Deny-list (Blacklist)**: Keep a list of revoked tokens in a fast store like Redis.
  - **Version/Key Rotation**: Increment a version number on the user object and include it in the JWT; if they don't match, the token is invalid.
