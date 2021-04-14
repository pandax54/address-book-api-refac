# Address Book API

## :computer: Project
An address Book API with Node.js, Express, Postgres and Firebase.
Register your contacts in web and mobile using this API.
</br>

</br>

## :rocket: Technologies

#### :us: This project was developed with the following technologies:

- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Express](https://github.com/expressjs/express)
- Nodejs
- Firebase
- Postgres
- TypeORM
- Bcrypt
- JWT
- Celebrate (Joi)
- Prettier
- ESLint
- Jest
- Supertest
- Swagger Ui
- Pino
- Docker
- Docker-compose


</br>


## Steps


### install - Back-End

1. First clone the repository.


2. Create a .env file (remember to add your keys)

```
mv .env.example .env
```

4. Configure the name and other attributes of your database on ormconfig.js and docker-compose file.

3. run the docker images:
```
$ docker-compose up
```

### Setting the ormconfig.json
In the root you must configure the ```ormconfig.js```with your informations:
Do not forget to match this information with the docker-compose.yml

```
----> do not forget to change for your settings
  {
    "type": "postgres",
    "host": "localhost",
    "port": [$PORT],
    "username": [$USERNAME],
    "password": [$PASSWORD], 
    "database": [$DATABASE],
    "synchronize": true,
    "logging": true,
    "migrations": [
      "./src/database/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/database/migrations/*.ts"
    },
    "entities": [
      " ./src/models/*.ts"
    ]
  }
```
Run the migrations using this command:
```
$ yarn orm migration:run
```

### ENV variables 
In the file ```.env.example``` you must fill your envinroment variables
Dont forget to remove the example in the name of the file, the file must be like this: ```.env```


### Starting the server

```
$ docker-compose start
```

## Testing

Create a test database and run the migrations before running the tests. Change the database name on ormconfig.json for the test database.

```
$ yarn test
```

## API DOCS

For API docs access:
```
/api-docs
```

https://address-book-fernanda.herokuapp.com/api-docs

# Deploy in Heroku

https://address-book-fernanda.herokuapp.com/api/v1/
