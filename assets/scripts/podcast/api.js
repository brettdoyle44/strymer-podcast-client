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

module.exports = {
  showPodcasts,
  favoriteSubmit
}
