'use strict'

const config = require('../config')

const store = require('../store')

const signUp = formData => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    data: formData,
    method: 'POST'
  })
}

const signIn = formData => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    data: formData,
    method: 'POST'
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showPodcasts = () => {
  return $.ajax({
    url: config.apiUrl + '/podcasts',
    method: 'GET'
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  showPodcasts
}
