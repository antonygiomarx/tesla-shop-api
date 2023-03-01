<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) project.

# Initial Setup

1. Install dependencies

```bash
$ npm install
```

2. Wake up the database

```bash
$ docker-compose up -d
```

3. Run server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

4. Create User

```bash

# create user

$ curl -X POST \
  http://localhost:3000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{
    "email": ""
    "password": ""
}'

```

5. Run Seed with token

```bash
$ curl http://localhost:3000/api/seed
      -H "Authorization: Bearer <token>"
```

# Docker

1. Build the image

```bash
$ docker compose up -d
```

2. Run the container

```bash
$ docker run -p 3000:3000 nestjs-starter
```



