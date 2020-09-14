## CHANGE THE 'development' OBJECT IN 'knexfile.js' TO : 

``` js
development: { 
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/[CHANGE ME.db3]', // change to name of database 
  },
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  },
},
```

## ADD _server_ AND _start_ SCRIPTS TO package.json:

``` js
"scripts": {
    "server": "nodemon index.js",
    "start": "node index.js"
},
```

## RUN COMMAND AFTER YOU FINISH THE EDITS
knex migrate:make init