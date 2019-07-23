'use strict'

const authEvents = require('./auth/events')

$(() => {
  // auth events
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)

  // podcast events
  $('#sign-out').on('click', authEvents.onSignOut)
})
