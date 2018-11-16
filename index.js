const express = require('express')
const app = express()

app.get('/', function (req, res, next) {
    res.json({ message: 'Read all playlists' })
})

const port = 4000
app.listen(port, () => `Listening on port ${port}`)