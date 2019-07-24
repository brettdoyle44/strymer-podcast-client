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

module.exports = {
  onPodcastClick
}
