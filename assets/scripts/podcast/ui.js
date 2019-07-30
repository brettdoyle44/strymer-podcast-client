'use strict'

const store = require('../store')
const api = require('./api')
const showPodcastsTemplate = require('../templates/podcast-list.handlebars')
const indexFavoritesTemplate = require('../templates/favorite-index.handlebars')
const showFavoritesTemplate = require('../templates/favorite-list.handlebars')
const showNavbarTemplate = require('../templates/navbar.handlebars')
const showPodcastIndex = require('../templates/podcast-index-div.handlebars')
// const showFavoritesDiv = require('../templates/favorite-list-div.handlebars')
const showPlaybar = require('../templates/playbar.handlebars')
const showSuccessMessage = require('../templates/success-message.handlebars')
const showFailureMessage = require('../templates/success-message.handlebars')
const showFullModal = require('../templates/full-screen-modal.handlebars')
const successMessage = showSuccessMessage()
const failureMessage = showFailureMessage()

const showPodcastsSuccess = responseData => {
  store.podcasts = responseData.podcasts
  $('main').empty()
  const navbar = showNavbarTemplate()
  $('head').append('<link id="addSheet" rel="stylesheet" href="assets/css/push.css">')
  const podcastIndex = showPodcastIndex()
  const playBar = showPlaybar()
  const fullModal = showFullModal()
  api.favoriteList()
    .then(favoriteListSuccess)
    .catch(favoriteListFail)
  $('body').prepend(navbar)
  $('main').append(fullModal)
  $('main').append(podcastIndex)
  $('main').append(playBar)
  $('main').prepend(successMessage)
  $('.alert-success').text('You signed-up successfully, please sign-in.')
  const podcastsHtml = showPodcastsTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
  $('.alert-success').fadeOut(2000)
}

const showPodcastsFail = () => {
  $('main').empty()
  $('main').prepend(failureMessage)
  $('.alert-danger').text('Something went wrong')
  $('.alert-danger').fadeOut(2000)
}

const favoriteSubmitSuccess = responseData => {
  store.playlists = responseData
  $('main').empty()
  const fullModal = showFullModal()
  $('main').append(fullModal)
  const podcastsHtml = indexFavoritesTemplate({ podcasts: store.podcasts })
  $('.favorite-index').append(podcastsHtml)
  $('#favorite-create').addClass('hide')
}

const favoriteSubmitFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteAddSuccess = responseData => {
  $('#message').text('Podcast successfully added')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
}

const favoriteAddFail = () => {
  $('#message').text('Podcast not added')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteListSuccess = responseData => {
  store.favoriteList = responseData
  console.log(store.favoriteList)
  const podcastsHtml = showFavoritesTemplate({ playlists: store.favoriteList.playlists })
  $('.fav-nav').append(podcastsHtml)
}

const favoriteListFail = () => {
  $('#message').text('Podcast not added')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteListDeleteSuccess = responseData => {
  $('#message').text('Favorite list successfully deleted')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
}

const favoriteListDeleteFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteListEditSuccess = responseData => {
  $('.favorite-list').html('')
  $('#message').text('Favorite list updated')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
}

const favoriteListEditFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

module.exports = {
  showPodcastsSuccess,
  showPodcastsFail,
  favoriteSubmitSuccess,
  favoriteSubmitFail,
  favoriteAddFail,
  favoriteAddSuccess,
  favoriteListSuccess,
  favoriteListFail,
  favoriteListDeleteSuccess,
  favoriteListDeleteFail,
  favoriteListEditSuccess,
  favoriteListEditFail
}
