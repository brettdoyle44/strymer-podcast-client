'use strict'

const store = require('../store')
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
  const podcastIndex = showPodcastIndex()
  const playBar = showPlaybar()
  const fullModal = showFullModal()
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
  $('#favorites').removeClass('hide')
  store.playlists = responseData
  $('.favorite-index').html('')
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
  $('main').empty()
  // const listFavorites = showFavoritesTemplate()
  // const favoriteDiv = showFavoritesDiv()
  // $('main').append(favoriteDiv)
  // $('main').append(listFavorites)
  const podcastsHtml = showFavoritesTemplate({ playlists: store.favoriteList.playlists })
  $('main').append(podcastsHtml)
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
