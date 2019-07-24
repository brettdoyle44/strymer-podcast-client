'use strict'

const authEvents = require('./auth/events')
const podcastEvents = require('./podcast/events')

$(() => {
  // auth events
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)

  // podcast events
  $('.podcast-index').on('click', '.card-click', podcastEvents.onPodcastClick)
  $('#favorites').on('click', podcastEvents.onFavoriteClick)
  $('body').on('submit', '#favorite-create', podcastEvents.onFavoriteSubmit)
  $('.favorite-index').on('click', '.card-click-add', podcastEvents.onPodcastAddClick)
})
