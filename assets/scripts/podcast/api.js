'use strict'

const config = require('../config')

const store = require('../store')

const showPodcasts = () => {
  return $.ajax({
    url: config.apiUrl + '/podcasts',
    method: 'GET'
  })
}

const favoriteSubmit = formData => {
  return $.ajax({
    url: config.apiUrl + '/playlists',
    data: formData,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const favoriteAdd = (currentPodcast, currentPlaylist) => {
  return $.ajax({
    url: config.apiUrl + '/playlist_podcasts',
    data: {
      playlist_podcast: {
        podcast_id: currentPodcast,
        playlist_id: currentPlaylist
      }
    },
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const favoriteList = () => {
  return $.ajax({
    url: config.apiUrl + '/playlists',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteFavorite = (currentPlaylist) => {
  return $.ajax({
    url: config.apiUrl + '/playlists/' + currentPlaylist,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editFavorite = (currentPlaylist, formData) => {
  return $.ajax({
    url: config.apiUrl + '/playlists/' + currentPlaylist,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  showPodcasts,
  favoriteSubmit,
  favoriteAdd,
  favoriteList,
  deleteFavorite,
  editFavorite
}
