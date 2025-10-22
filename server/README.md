# Hex2048 Game Server

A backend service built with NestJS, Prisma, and PostgreSQL to power the Hexagonal 2048 game.
It supports user authentication (JWT), game session management, and persistent game state saving.

## Features:

- JWT Authentication (login, protected routes)
- User Management (register, login, profile)
- Game Engine — custom hexagonal grid 2048 implementation
- Persistent Storage with Prisma ORM
- Unit Tests with Jest
- Modular Architecture (auth, user, game modules)

## Tech Stack
Layer	         Technology

Framework	     NestJS
ORM	             Prisma
Database	     PostgreSQL
Auth	         JWT (via @nestjs/jwt)
Testing	         Jest
Language	     TypeScript

## Installation

Clone the repository and install dependencies:

git clone https://github.com/mykytapilec/benzol.git
cd benzol
pnpm install

## Environment Setup

Create a .env file in the project root:

DATABASE_URL="postgresql://user:password@localhost:5432/hex2048?schema=public"
JWT_SECRET="your_jwt_secret_here"
PORT=4000


Then run migrations:

npx prisma migrate deploy


(Optional) generate Prisma client:

npx prisma generate

## Running the Server
Development
pnpm start:dev

Production
pnpm build
pnpm start:prod

The API will be available at
👉 http://localhost:4000