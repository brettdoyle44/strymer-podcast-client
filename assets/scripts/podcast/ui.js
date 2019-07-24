'use strict'

const store = require('../store')

const showPodcastsSuccess = responseData => {
  store.podcasts = responseData.podcasts
  $('.podcast-index').html('')
  store.podcasts.forEach(function (podcast, index) {
    store.podcastEpisode = podcast.episodes
    const podcastsHtml = (`
      <div class="click-me col-4 mt-5">
      <div class="card" data-podcast="${podcast.id}"  style="width: 18rem;">
        <img src="${podcast.image}" data-cell-index="${index}" class="card-img-top card-click" alt="...">
        <div class="card-body">
          <h5 class="card-title">${podcast.title}</h5>
          <p class="card-text">${podcast.publisher}</p>
        </div>
      </div>
      </div>
    `)

    $('.podcast-index').append(podcastsHtml)
    // store.podcastId = responseData.podcasts.id
  })
}

// const showPodcastsSuccess = responseData => {
//   $('#message').text('Eventually this will work.')
//   $('#message').removeClass('alert-danger')
//   $('#message').addClass('alert-success')
//   console.log(responseData)
//   store.user = responseData.user
// }

const showPodcastsFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const favoriteSubmitSuccess = responseData => {
  $('#message').text('You are now signed in!')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
  $('form').trigger('reset')
  console.log(responseData)
}

const favoriteSubmitFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

module.exports = {
  showPodcastsSuccess,
  showPodcastsFail,
  favoriteSubmitSuccess,
  favoriteSubmitFail
}
