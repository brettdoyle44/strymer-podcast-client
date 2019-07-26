'use strict'

const store = require('../store')
const showPodcastsTemplate = require('../templates/podcast-list.handlebars')
const indexFavoritesTemplate = require('../templates/favorite-index.handlebars')
const showFavoritesTemplate = require('../templates/favorite-list.handlebars')

const showPodcastsSuccess = responseData => {
  store.podcasts = responseData.podcasts
  $('.podcast-index').html('')
  const podcastsHtml = showPodcastsTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
}

const showPodcastsFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
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
  $('.favorite-list').html('')
  const podcastsHtml = showFavoritesTemplate({ playlists: store.favoriteList.playlists })
  $('.favorite-list').append(podcastsHtml)
  $('.favorite-index').addClass('hide')
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
