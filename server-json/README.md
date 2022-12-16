# JSON Server

## Security

> **Important:** There is no security in a system that stores passwords unencrypted or locally...

## Authentication

Authentication will be handled via basic authentication (ie. `username:password`).

## Models

See [`sample.json`](./sample.json) for example schema shapes/types.

## Routes

### Account

| Method | Route | Notes |
|--------|-------|-------|
| `POST` | `/account`
| `GET` | `/account/:id`
| `PATCH` | `/account/:id`
| `DELETE` | `/account/:id`

### Password

> **Note:** Password routes must always be scoped to current user!

| Method | Route | Notes |
|--------|-------|-------|
| `GET` | `/password` | _search, filter, paginate_
| `POST` | `/password`
| `GET` | `/password/:id`
| `PATCH` | `/password/:id` | _temporarily used for star/unstar_
| `DELETE` | `/password/:id`
| `PUT` | `/password/:id/star` | _requires manual route_
| `DELETE` | `/password/:id/star` | _requires manual route_

### Collection

> **Note:** Collection routes must always be scoped to current user!

| Method | Route | Notes |
|--------|-------|-------|
| `GET` | `/collection` | _search_
| `POST` | `/collection`
| `GET` | `/collection/:id`
| `PATCH` | `/collection/:id`
| `DELETE` | `/collection/:id`
| `GET` | `/collection/:id/password` | _search, paginate_

