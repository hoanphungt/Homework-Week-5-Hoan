const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../playlists/model')

const User = sequelize.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passwordConfirmation: {
        type: Sequelize.STRING,
        field: 'password_confirmation',
        allowNull: false
    }
}, {
        timestamps: false,
        tableName: 'users'
    })

User.hasMany(Playlist, {onDelete: 'cascade', hooks: true})

module.exports = User
