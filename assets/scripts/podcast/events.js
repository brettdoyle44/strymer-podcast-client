'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const showEpisodesTemplate = require('../templates/episode-list.handlebars')
const showPodcastsTemplate = require('../templates/podcast-list.handlebars')
const clickFavoritesTemplate = require('../templates/favorite-click.handlebars')
const showEpisodesDivTemplate = require('../templates/episode-index-div.handlebars')
const showEpisodePodcastTemplate = require('../templates/episode-podcast-info.handlebars')
const showPodcastIndex = require('../templates/podcast-index-div.handlebars')
const showFullModal = require('../templates/full-screen-modal.handlebars')
const showFavTitleDiv = require('../templates/fav-title-show-div.handlebars')
const showNavbarTemplate = require('../templates/navbar.handlebars')
const showSuccessMessage = require('../templates/success-message.handlebars')
const showPlayBar = require('../templates/playbar.handlebars')
const successMessage = showSuccessMessage()

let audio = false

const playAudio = (url) => {
  const a = new Audio(url)
  if (audio === false) {
    a.play()
  } else {
    a.pause()
  }
}

const removeActive = () => {
  $('#favorites').removeClass('nav-active')
  $('#settings').removeClass('nav-active')
  $('#home').removeClass('nav-active')
}

const onPodcastClick = event => {
  event.preventDefault()
  const target = event.target
  removeActive()
  $('main').empty()
  const index = $(target).data('cell-index')
  store.currentPodcast = store.podcasts[index]
  const currentPodcast = store.currentPodcast
  const episodePodcast = showEpisodePodcastTemplate({currentPodcast})
  const episodeIndex = showEpisodesDivTemplate()
  const fullModal = showFullModal()
  $('main').append(fullModal)
  $('main').append(episodePodcast)
  $('main').append(episodeIndex)
  const podcastsHtml = showEpisodesTemplate({ episodes: currentPodcast.episodes })
  $('.episode-index').append(podcastsHtml)
}

const onFavoriteClick = event => {
  event.preventDefault()
  removeActive()
  $('main').empty()
  const fullModal = showFullModal()
  $('main').append(fullModal)
  $('#favorites').addClass('nav-active')
  api.favoriteList()
    .then(ui.favoriteListSuccess)
    .catch(ui.favoriteListFail)
}

const onHomeClick = event => {
  event.preventDefault()
  removeActive()
  $('#home').addClass('nav-active')
  $('main').empty()
  const fullModal = showFullModal()
  $('main').append(fullModal)
  const podcastIndex = showPodcastIndex()
  $('main').append(podcastIndex)
  const podcastsHtml = showPodcastsTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
}

const onFavoriteOpen = event => {
  event.preventDefault()
  $('.podcast-index').addClass('hide')
  $('.favorite-buttons').removeClass('hide')
  onFavoriteList()
}

const onFavoriteSubmit = event => {
  event.preventDefault()
  $('#myModal').modal('hide')
  const form = event.target
  const formData = getFormFields(form)
  api.favoriteSubmit(formData)
    .then(ui.favoriteSubmitSuccess)
    .catch(ui.favoriteSubmitFail)
}

// Handles adding podcasts to playlist
const onPodcastAddClick = event => {
  event.preventDefault()
  const target = event.target
  const currentPodcast = $(target).data('podcast')
  const currentPlaylist = store.playlists.playlist.id
  api.favoriteAdd(currentPodcast, currentPlaylist)
    .then(ui.favoriteAddSuccess)
    .then($(target).parent('div').fadeOut(1000))
    .catch(ui.favoriteAddFail)
}

const onFavoriteList = event => {
  event.preventDefault()
  api.favoriteList()
    .then(ui.favoriteListSuccess)
    .catch(ui.favoriteListFail)
}

const onFavoriteListClick = event => {
  event.preventDefault()
  const target = event.target
  $('main').empty()
  const index = $(target).data('favorite-list')
  const currentPodcast = store.favoriteList.playlists[index]
  const showPodcastsDiv = showPodcastIndex()
  const fullModal = showFullModal()
  const favTitleDiv = showFavTitleDiv()
  $('main').append(fullModal)
  $('main').append(favTitleDiv)
  $('main').append(showPodcastsDiv)
  const podcastsTitle = (`<div class="col-12 mt-5 justify-content-center text-center hide edit-fav-title" style="color: #ffffff;">
  <form class="edit-form" data-playlist-edit="${currentPodcast.id}">
    <div class="form-group edit-favorites-form pb-1">
      <input class="form-control text-center" required type="text" name="playlist[title]" placeholder="New title here">
    </div>
    <button class="form-control btn btn-pink" style="width: 200px;">Submit</button>
  </form>
    </div><div class="col-12 mt-5 text-center fav-title-hide" style="color: #ffffff;"><h1><strong>${currentPodcast.title}</strong></h1></div>
  <div class="col-12 mt-2 text-center fav-title-hide"><button id="delete-favorite" class="btn btn-pink" data-playlist-delete="${currentPodcast.id}">Delete This List</button> <button id="edit-open" class="btn btn-pink" data-playlist-edit="${currentPodcast.id}">Edit The Title</button></div>`)
  const podcastsHtml = clickFavoritesTemplate({ podcasts: currentPodcast.podcasts })
  $('.fav-title-show').append(podcastsTitle)
  $('.podcast-index').append(podcastsHtml)
}

const onDeleteFavorite = event => {
  event.preventDefault()
  const target = event.target
  const currentPlaylist = $(target).data('playlist-delete')
  api.deleteFavorite(currentPlaylist)
    .then(ui.favoriteListDeleteSuccess)
    .catch(ui.favoriteListDeleteFail)
}

const onEditFavoriteSubmit = event => {
  event.preventDefault()
  const target = event.target
  const currentPlaylist = $(target).data('playlist-edit')
  const formData = getFormFields(target)
  api.editFavorite(currentPlaylist, formData)
    .then(ui.favoriteListEditSuccess)
    .catch(ui.favoriteListEditFail)
}

const onEditOpen = event => {
  $('.edit-fav-title').removeClass('hide')
  $('.fav-title-hide').addClass('hide')
}

const onFavoriteAddDone = event => {
  event.preventDefault()
  const main = ('<main class="container-fluid"></main>')
  $('body').empty()
  $('body').append(main)
  const navbar = showNavbarTemplate()
  const podcastIndex = showPodcastIndex()
  // const playBar = showPlaybar()
  const fullModal = showFullModal()
  api.favoriteList()
    .then(ui.favoriteListSuccess)
    .catch(ui.favoriteListFail)
  $('body').prepend(navbar)
  $('main').append(fullModal)
  $('main').append(podcastIndex)
  // $('main').append(playBar)
  $('main').prepend(successMessage)
  $('.alert-success').text('You have successfully created a favorite list')
  const podcastsHtml = showPodcastsTemplate({ podcasts: store.podcasts })
  $('.podcast-index').append(podcastsHtml)
  $('.alert-success').fadeOut(1500)
}

const onPlayClick = event => {
  event.preventDefault()
  const target = event.target
  store.currentAudio = $(target).data('audio')
  audio = true
  const currentAudio = store.currentAudio
  playAudio(currentAudio)
  const currentPodcast = store.currentPodcast
  const playBar = showPlayBar({currentPodcast}, {currentAudio})
  $('main').append(playBar)
}

const onPauseClick = event => {
  event.preventDefault()
  // const currentAudio = store.currentAudio
  audio = false
  if (audio === false) {
    $('.play-pause').removeClass('fa-pause-circle')
    $('.play-pause').addClass('fa-play-circle')
  } else {
    $('.play-pause').removeClass('fa-pause-circle')
    $('.play-pause').addClass('fa-play-circle')
    audio = true
  }
}

module.exports = {
  onPodcastClick,
  onFavoriteClick,
  onFavoriteSubmit,
  onPodcastAddClick,
  onFavoriteList,
  onFavoriteListClick,
  onDeleteFavorite,
  onEditFavoriteSubmit,
  onFavoriteOpen,
  onHomeClick,
  onEditOpen,
  onFavoriteAddDone,
  onPlayClick,
  onPauseClick
}
