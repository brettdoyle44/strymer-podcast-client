'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const showPodcastsTemplate = require('../templates/episode-list.handlebars')
const clickFavoritesTemplate = require('../templates/favorite-click.handlebars')

const onPodcastClick = event => {
  event.preventDefault()
  const target = event.target
  const index = $(target).data('cell-index')
  const currentPodcast = store.podcasts[index]
  $('.episode-index').html('')
  const podcastsHtml = showPodcastsTemplate({ episodes: currentPodcast.episodes })
  $('.episode-index').append(podcastsHtml)
  // const episodeAudio = new Audio(episode.audio)
}

const onFavoriteClick = event => {
  event.preventDefault()
  $('#favorites').addClass('hide')
  $('.favorite').html('')
  const podcastsHtml = (`
        <form id="favorite-create">
          <div class="form-group">
            <input class="form-control" required type="text" name="playlist[title]" placeholder="Name your favorites list">
          </div>
          <button type="submit" class="form-control btn btn-pink">Create Favorite List</button>
        </form>
  `)
  $('.favorite').append(podcastsHtml)
}

const onFavoriteOpen = event => {
  event.preventDefault()
  $('.podcast-index').addClass('hide')
  $('.favorite-buttons').removeClass('hide')
}

const onFavoriteSubmit = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.favoriteSubmit(formData)
    .then(ui.favoriteSubmitSuccess)
    .catch(ui.favoriteSubmitFail)
}

const onPodcastAddClick = event => {
  event.preventDefault()
  const target = event.target
  const currentPodcast = $(target).data('podcast')
  const currentPlaylist = store.playlists.playlist.id
  api.favoriteAdd(currentPodcast, currentPlaylist)
    .then(ui.favoriteAddSuccess)
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
  console.log(target)
  const index = $(target).data('favorite-list')
  const currentPodcast = store.favoriteList.playlists[index]
  console.log(currentPodcast)
  $('.favorite-podcast').html('')
  const podcastsHtml = clickFavoritesTemplate({ podcasts: currentPodcast.podcasts })
  $('.favorite-podcast').append(podcastsHtml)
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

module.exports = {
  onPodcastClick,
  onFavoriteClick,
  onFavoriteSubmit,
  onPodcastAddClick,
  onFavoriteList,
  onFavoriteListClick,
  onDeleteFavorite,
  onEditFavoriteSubmit,
  onFavoriteOpen
}
