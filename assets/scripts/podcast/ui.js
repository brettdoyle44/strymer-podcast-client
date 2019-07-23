'use strict'

const store = require('../store')

const showPodcastsSuccess = responseData => {
  $('#message').text('Eventually this will work.')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
  console.log(responseData)
  store.user = responseData.user
}

const showPodcastsFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

module.exports = {
  showPodcastsSuccess,
  showPodcastsFail
}
