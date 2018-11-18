const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define('songs', {
    title: {
        type: Sequelize.STRING,
        field: 'title',
        allowNull: false
    },
    artist: {
        type: Sequelize.STRING,
        field: 'artist_name',
        allowNull: false
    },
    album: {
        type: Sequelize.STRING,
        field: 'album_title'
    }
}, {
    timestamps: false,
    tableName: 'songs'
})

module.exports = Song