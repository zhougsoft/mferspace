# mferspace

> a space for mfers

1 mfer token = 1 mferspace profile page

** *please excuse the messy styling currently! still a ways to go in that department <3*

## requirements

- a postgres database connection URL
  - you can quickly spin up a DB [here](https://railway.app/) or [here](https://www.elephantsql.com/) - for free!
- an [alchemy](https://www.alchemy.com) or [infura](https://infura.io) API key

## to run

1. install dependencies:
   ```bash
   npm install
   ```
1. make a copy of `.env.example` named `.env`
1. assign your postgres database connection string to the `DATABASE_URL` environment variable
   ```bash
   #inside .env
   DATABASE_URL=postgresql://postgres:etc...
   ```
1. run database setup migration (and optionally seed with test data):

   ```bash
   npm run db:up

   # optional test data
   npm run db:seed
   ```

1. run local development server:
   ```bash
   npm run dev
   ```
1. check out `localhost:3000` in the browser!

## database management

some npm scripts to interface with the database

```bash
# migrate the db up
npm run db:up

# migrate the db down
npm run db:down

# seed the db with test data
npm run db:seed

# drop & rebuild the db with seed data in one command
npm run db:reset
```
