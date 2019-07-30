'use strict'

const authEvents = require('./auth/events')
const podcastEvents = require('./podcast/events')
// const showHomescreenTemplate = require('./templates/home-screen.handlebars')

$(() => {
  // auth events
  $('body').on('submit', '#sign-up', authEvents.onSignUp)
  $('body').on('submit', '#sign-in', authEvents.onSignIn)
  $('body').on('click', '#sign-out', authEvents.onSignOut)
  $('body').on('click', '#settings', authEvents.onSettingButton)
  $('body').on('submit', '#change-password', authEvents.onChangePass)

  // podcast events
  $('body').on('click', '.card-click', podcastEvents.onPodcastClick)
  $('body').on('click', '#favorites', podcastEvents.onFavoriteClick)
  $('body').on('submit', '#favorite-create', podcastEvents.onFavoriteSubmit)
  $('body').on('click', '.card-click-add', podcastEvents.onPodcastAddClick)
  $('body').on('click', '#list-favorites', podcastEvents.onFavoriteList)
  $('body').on('click', '.favorite-item', podcastEvents.onFavoriteListClick)
  $('body').on('click', '#delete-favorite', podcastEvents.onDeleteFavorite)
  $('body').on('submit', '.edit-form', podcastEvents.onEditFavoriteSubmit)
  $('body').on('click', '#favorites-open', podcastEvents.onFavoriteOpen)
  $('body').on('click', '#home', podcastEvents.onHomeClick)
})
