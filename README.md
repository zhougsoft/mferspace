# mferspace

> a space for mfers

## requirements

- a postgres database connection URL
- an [alchemy](https://www.alchemy.com) or [infura](https://infura.io) API key

## to run

1. install dependencies:
   ```
   npm install
   ```
1. make a copy of `.env.example` named `.env` and add credentials
1. run database setup migration:
   ```
   npm run db:up
   ```
1. run local development server:
   ```
   npm run dev
   ```
1. check out `localhost:3000` in the browser!

**_power tip:_** revert and clear the database if required:

```
npm run db:down

# or reset with seed
npm run db:reset
```
