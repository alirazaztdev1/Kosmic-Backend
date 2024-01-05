## Postgres and Nest with TypeOrm and auto migration base sample

### Installation

`npm i`

### Running

add .env according to .env.example then create the db. after that generate migrations and then run the code.

### run migration

`npm run migration:run`

This will run all migrations

### Generate migration

`npm run migration:generate`

This will generate migrations for all tables

### revert migration

`npm run migration:revert`

This will revert migrations

### Run the sample

Then, run Nest as usual:

`npm run start:dev`
