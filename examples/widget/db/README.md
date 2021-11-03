# Database

This example uses the [Prisma](https://www.prisma.io/) ORM on top of a [PostgreSQL](https://www.postgresql.org/) database.

This means there are some additional steps you need to perform in order to configure your database.

## PostgreSQL instance

You need to have a working installation of PostgreSQL and a postgres server instance running. The installation steps depend on your OS, but you can find more information in the [PostgreSQL](https://www.postgresql.org/download/) installation documentation.

After you have your postgres server up and running, you need to take note of the database connection URL string. Feel free to use any method you prefer to connect and modify the connection string accordingly.

```
postgresql://username:password@localhost:5432/widget_development?schema=public
```

## Set up Prisma

Follow the [Prisma documentation](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-typescript-postgres) to connect your database to prisma and migrate your schema.

In essence, you'll have to

- Let Prisma know about your database. Create a `.env` file inside the `db/prisma` folder and set the `DATABASE_URL` environment variable with your PostgreSQL connection URL.
- Generate the schema and apply the migrations. Run `yarn prisma migrate dev --name init --schema ./db/prisma/schema.prisma`.

## Schema

We've created a `users` table with a very simple schema.

The primary key for the `users` table is the `external_id` column. The "external" part denotes that this ID comes from Clerk.

The rest of the user attributes will simply be stored in a JSON column, called `attributes`.
