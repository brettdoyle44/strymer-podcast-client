'use strict'

const store = require('../store')
const api = require('./api')
const showPodcastsTemplate = require('../templates/podcast-list.handlebars')
const indexFavoritesTemplate = require('../templates/favorite-index.handlebars')
const showFavoritesTemplate = require('../templates/favorite-list.handlebars')
const showNavbarTemplate = require('../templates/navbar.handlebars')
const showPodcastIndex = require('../templates/podcast-index-div.handlebars')
// const showFavoritesDiv = require('../templates/favorite-list-div.handlebars')
// const showPlaybar = require('../templates/playbar.handlebars')
const showSuccessMessage = require('../templates/success-message.handlebars')
const showFailureMessage = require('../templates/success-message.handlebars')
const showFullModal = require('../templates/full-screen-modal.handlebars')
const successMessage = showSuccessMessage()
const failureMessage = showFailureMessage()

// const removeActive = () => {
//   $('#favorites').removeClass('nav-active')
//   $('#settings').removeClass('nav-active')
//   $('#home').removeClass('nav-active')
// }

const showPodcastsSuccess = responseData => {
  store.podcasts = responseData.podcasts
  $('main').empty()
  const navbar = showNavbarTemplate()
  $('head').append('<link id="addSheet" rel="stylesheet" href="assets/css/push.css">')
  const podcastIndex = showPodcastIndex()
  // const playBar = showPlaybar()
  const fullModal = showFullModal()
  api.favoriteList()
    .then(favoriteListSuccess)
    .catch(favoriteListFail)
  $('body').prepend(navbar)
  $('main').append(fullModal)
  $('main').append(podcastIndex)
  // $('main').append(playBar)
  $('main').prepend(successMessage)
  $('.alert-success').text('You signed-up successfully, please sign-in.')
  const podcastsHtml = showPodcastsTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
  $('.alert-success').fadeOut(1500)
}

const showPodcastsFail = () => {
  $('main').empty()
  $('main').prepend(failureMessage)
  $('.alert-danger').text('Something went wrong')
  $('.alert-danger').fadeOut(1500)
}

const favoriteSubmitSuccess = responseData => {
  store.playlists = responseData
  $('main').empty()
  const fullModal = showFullModal()
  const podcastIndex = showPodcastIndex()
  const playlistTitle = (`<div class="col-12 mt-5 text-center" style="color: #ffffff;"><h1><strong>Add podcasts to ${store.playlists.playlist.title}</strong></h1></div>
  <div class="col-12 mt-2 text-center fav-done"><button id="done-add" class="btn btn-pink">Done Adding Podcasts</button></div>`)
  $('main').append(playlistTitle)
  $('main').append(podcastIndex)
  $('main').append(fullModal)
  const podcastsHtml = indexFavoritesTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
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
  // $('.card-click-add').addClass('hide')
}

const favoriteAddFail = () => {
  $('#message').text('Podcast not added')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteListSuccess = responseData => {
  store.favoriteList = responseData
  const podcastsHtml = showFavoritesTemplate({ playlists: store.favoriteList.playlists })
  $('.fav-nav').append(podcastsHtml)
}

const favoriteListFail = () => {
  $('#message').text('Podcast not added')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteListDeleteSuccess = responseData => {
  const main = ('<main class="container-fluid"></main>')
  $('body').empty()
  $('body').append(main)
  const navbar = showNavbarTemplate()
  const podcastIndex = showPodcastIndex()
  // const playBar = showPlaybar()
  const fullModal = showFullModal()
  api.favoriteList()
    .then(favoriteListSuccess)
    .catch(favoriteListFail)
  $('body').prepend(navbar)
  $('main').append(fullModal)
  $('main').append(podcastIndex)
  // $('main').append(playBar)
  $('main').prepend(successMessage)
  $('.alert-success').text('You have successfully deleted a favorite list')
  const podcastsHtml = showPodcastsTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
  $('.alert-success').fadeOut(1500)
}

const favoriteListDeleteFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteListEditSuccess = responseData => {
  $('.fav-title-show').empty()
  const podcastsTitle = (`<div class="col-12 mt-5 justify-content-center text-center hide edit-fav-title" style="color: #ffffff;">
  <form class="edit-form" data-playlist-edit="${responseData.playlist.id}">
    <div class="form-group edit-favorites-form pb-1">
      <input class="form-control text-center" required type="text" name="playlist[title]" placeholder="New title here">
    </div>
    <button class="form-control btn btn-pink" style="width: 200px;">Submit</button>
  </form>
    </div><div class="col-12 mt-5 text-center fav-title-hide" style="color: #ffffff;"><h1><strong>${responseData.playlist.title}</strong></h1></div>
  <div class="col-12 mt-2 text-center fav-title-hide"><button id="delete-favorite" class="btn btn-pink" data-playlist-delete="${responseData.playlist.id}">Delete This List</button> <button id="edit-open" class="btn btn-pink" data-playlist-edit="${responseData.playlist.id}">Edit The Title</button></div>`)
  $('.fav-title-show').append(podcastsTitle)
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
