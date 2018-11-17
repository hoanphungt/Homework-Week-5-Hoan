const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.post('/playlists/:id/songs', (req, res, next) => {
    Playlist
        .findById(req.params.id, { include: [Song] })
        .then(playlist => {
            const id = req.params.id
            if (!playlist) {
                return res.status(404).send({
                    message: `This playlist does not exist`
                })
            } else {
                Song
                if (!req.body.playlistId) {
                    res.status(400).send({
                        message: `Please enter a correct playlist with playlistId of ${id}`
                    })
                }
                if (req.body.playlistId !== id) {
                    res.status(400).send({
                        message: `This song can only be created in playlist with playlistId of ${id}`
                    })
                } else {
                    Song
                        .create(req.body)
                        .then(song => {
                            if (!song) {
                                return res.status(404).send({
                                    message: `This song does not exist`
                                })
                            }
                            return res.status(201).send(song)
                        })
                        .catch(error => next(error))
                }
            }
        })
        .catch(error => next(error))
})

module.exports = router