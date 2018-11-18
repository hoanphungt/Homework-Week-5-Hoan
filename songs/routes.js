const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.post('/playlists/:id/songs', (req, res, next) => {
    Playlist
        .findById(req.params.id, { include: [Song] })
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `This playlist does not exist`
                })
            } else {
                Song
                    .create({
                        title: req.body.title,
                        artist: req.body.artist,
                        album: req.body.album,
                        playlistId: playlist.id
                    })
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
        })
        .catch(error => next(error))
})

module.exports = router