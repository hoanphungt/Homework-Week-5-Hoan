const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/routes')
const tokensRouter = require('./auth/route')

const app = express()
const port = process.env.PORT || 4000

app
    .use(bodyParser.json())
    .use(usersRouter)
    .use(tokensRouter)
    .listen(port, () => `Listening on port ${port}`)

