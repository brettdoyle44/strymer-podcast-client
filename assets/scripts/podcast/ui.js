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
  store.playlists = responseData
  console.log(store.favoriteList)
  store.podcasts.forEach(function (podcast, index) {
    const podcastsHtml = (`
      <div class="click-me col-4 mt-5">
      <div class="card" style="width: 18rem;">
        <img src="${podcast.image}" data-cell-index="${index}" data-podcast="${podcast.id}" class="card-img-top card-click-add" alt="...">
        <div class="card-body">
          <h5 class="card-title">${podcast.title}</h5>
          <p class="card-text">${podcast.publisher}</p>
        </div>
      </div>
      </div>
    `)

    $('.favorite-index').append(podcastsHtml)
  })
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
  store.favoriteList.playlists.forEach(function (favorite, index) {
    const podcastsHtml = (`
      <div class="col-4 mt-5">
      <div class="card favorite-card" style="width: 18rem;" data-favorite-list="${index}">
        <div class="card-body" data-favorite-list="${index}">
          <h5 class="card-title" data-favorite-list="${index}">${favorite.title}</h5>
          <p class="card-text" data-favorite-list="${index}">You have ${favorite.podcasts.length} podcasts in this list.</p>
        </div>
        </div>
        <button id="delete-favorite" class="btn btn-pink" data-playlist-delete="${store.favoriteList.playlists[index].id}">Delete This List</button>
      </div>
      </div>
    `)
    $('.favorite-list').append(podcastsHtml)
  })
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
  favoriteListDeleteFail
}
