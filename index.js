const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/routes')
const tokensRouter = require('./auth/route')
const playlistsRouter = require('./playlists/routes')
const songsRouter = require('./songs/routes')

const app = express()
const port = process.env.PORT || 4000

app
    .use(bodyParser.json())
    .use(songsRouter)
    .use(playlistsRouter)
    .use(usersRouter)
    .use(tokensRouter)
    .listen(port, () => `Listening on port ${port}`)

