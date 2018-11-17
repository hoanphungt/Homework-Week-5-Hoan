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
    },
    playlistId: {
        type: Sequelize.INTEGER,
        field: 'playlist_id',
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'songs'
})

module.exports = Song