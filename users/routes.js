const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt');
const Playlist = require('../playlists/model')

const router = new Router()

router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        passwordConfirmation: bcrypt.hashSync(req.body.password, 10)
    }

    User
    if (!req.body.email) {
        return res.status(400).send({
            message: 'Please enter your email address'
        })
    }
    if (!req.body.passwordConfirmation) {
        return res.status(400).send({
            message: 'Please enter your password confirmation'
        })
    }
    if (req.body.password !== req.body.passwordConfirmation) {
        return res.status(400).send({
            message: 'Password does not match'
        })
    } else {
        User
        .create(user)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User does not exist'
                })
            }
            return res.status(201).send(user)
        })    
        .catch(error => next(error))
    }
})

router.get('/users/:id', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Please enter a valid email and password'
        })
    } else {
        User
            .findOne({
                where: {
                    email: req.body.email,
                    id: req.params.id
                },
                include: [Playlist]
            })
            .then(user => {
                if (!user) {
                    res.status(400).send({
                        message: 'Invalid email address'
                    })
                }
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(200).send({
                        message: 'You have logined successfully',
                        user
                    })
                }
                else {
                    res.status(400).send({
                        message: 'Incorrect password'
                    })
                }
            })
            .catch(error => next(error))
    }
})

module.exports = router