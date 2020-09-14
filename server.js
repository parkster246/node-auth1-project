const express = require('express')
const server = express()
const bcrypt = require('bcryptjs')
const session = require('express-session')

const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')
const KnexSessionsStore = require('connect-session-knex')(session)
const dbConnection = require('./connection')

const sessionConfiguration = {
    name: 'monster',
    secret: 'keep it secret, keep it safe',
    cookie : {
      maxAge: 1000 * 60 * 10 , // after 10 min cookies expire
      secure: process.env.COOKIE_SECURE || false,
      httpOnly: true , 
    },
    resave: false ,
    saveUninitialized: true, // GDPR Compliance , the client should drive this
    store: new KnexSessionsStore ({
      knex: dbConnection ,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true ,
      clearInterval: 1000 * 60 *60
    })

  }


server.use(session(sessionConfiguration))
server.use(express.json())
server.use('/api/users' , usersRouter)
server.use('/api/auth', authRouter)

server.get('/', (req, res)=> {
    res.send('Working!')
  })

module.exports = server;
