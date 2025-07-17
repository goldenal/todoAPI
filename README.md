<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>



## Description
![Architecture](./Screenshot%202025-07-17%20at%2018.13.42.png)

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation



### Swagger UI

After starting the server, access the interactive API docs at:

```
http://localhost:3000/api
```

---

### REST Endpoints

#### Auth & User

- **Register**
  - `POST /users/register`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword",
      "name": "John Doe"
    }
    ```

- **Login**
  - `POST /auth/login`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
  - Response:
    ```json
    {
      "access_token": "<JWT_TOKEN>"
    }
    ```

#### To-Do (All require Bearer JWT in Authorization header)

- **Create To-Do**
  - `POST /todos`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Body:
    ```json
    {
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs"
    }
    ```

- **Get All To-Dos**
  - `GET /todos?page=1&limit=10&completed=true&search=groceries`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Query params:
    - `page` (optional, default: 1)
    - `limit` (optional, default: 10)
    - `completed` (optional, true/false)
    - `search` (optional, search in title)

- **Get Single To-Do**
  - `GET /todos/:id`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`

- **Update To-Do**
  - `PATCH /todos/:id`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Body (any of):
    ```json
    {
      "title": "New title",
      "description": "Updated description",
      "completed": true
    }
    ```

- **Delete To-Do**
  - `DELETE /todos/:id`
  - Headers: `Authorization: Bearer <JWT_TOKEN>`

---

For full details and to try out endpoints, use the Swagger UI at `/api` after running the server.

