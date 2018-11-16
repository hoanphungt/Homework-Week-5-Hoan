const { Router } = require('express')
const { toJWT } = require('./jwt')
const { toData } = require('./jwt')
const bcrypt = require('bcrypt')
const User = require('../users/model')
// const auth = require('./middleware')

const router = new Router()

router.post('/tokens', (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(400).send({
            message: 'Please enter an email and password'
        })
    } else {
        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                if (!user) {
                    res.status(400).send({
                        message: 'Invalid email address'
                    })
                }

                if (bcrypt.compareSync(req.body.password, user.password)) {
                    res.send({
                        message: 'Here is your jwt token',
                        jwt: toJWT({ userID: user.id })
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

router.get('/secret-endpoint', (req, res) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])
            res.send({
                message: 'Access granted!!!',
                data
            })
        }
        catch (error) {
            res.status(400).send({
                message: `Error ${error.name}: ${error.message}`,
            })
        }
    }
    else {
        res.status(401).send({
            message: 'Please supply some valid credentials'
        })
    }
})

// router.get('/secret-endpoint', auth, (req, res) => {
//     res.send({
//         message: `You are authorized to visit this authenticated section of ${req.user.email}!`
//     })
// })

module.exports = router