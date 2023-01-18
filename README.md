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

4. Run migrations

```bash
$ npm run typeorm migration:run
```

5. Run tests

```bash

# unit tests
$ npm run test
    
# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Docker

1. Build the image

```bash
$ docker build -t nestjs-starter .
```

2. Run the container

```bash
$ docker run -p 3000:3000 nestjs-starter
```


