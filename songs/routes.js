const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.get('/songs', (req, res, next) => {
    Song
        .findAll()
        .then(songs => {
            res.send({ songs })
        })
        .catch(error => next(error))
})

router.post('/playlists/:playlistId/songs', (req, res, next) => {
    Song
        .create(req.body)
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: 'This song does not exist'
                })
            }
            return res.status(201).send(song)
        })              
        .catch (error => res.status(400).send({
            message: `Error ${error.name}: ${error.message}`
        }))
})

module.exports = router