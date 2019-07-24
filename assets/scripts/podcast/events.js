'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onPodcastClick = event => {
  event.preventDefault()
  const target = event.target
  const index = $(target).data('cell-index')
  const currentPodcast = store.podcasts[index]
  $('.episode-index').html('')
  currentPodcast.episodes.forEach(function (episode) {
    const episodeAudio = new Audio(episode.audio)
    const podcastsHtml = (`
      <div class="click-me col-4 mt-5">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${episode.title}</h5>
          <p class="card-text">${episode.description}</p>
          <i class="fas fa-play"></i>
        </div>
      </div>
      </div>
    `)

    $('.episode-index').append(podcastsHtml)
    console.log(episodeAudio)
  })
}

const onFavoriteClick = event => {
  event.preventDefault()
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

module.exports = {
  onPodcastClick,
  onFavoriteClick,
  onFavoriteSubmit,
  onPodcastAddClick
}
