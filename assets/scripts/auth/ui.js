'use strict'

const store = require('../store')

const signUpSuccess = responseData => {
  $('#message').text('You signed-up successfully, please sign-in.')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
  $('form').trigger('reset')
  console.log(responseData)
}

const signUpFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
  $('form').trigger('reset')
}

const signInSuccess = responseData => {
  $('#message').text('You are now signed in!')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
  $('form').trigger('reset')
  console.log(responseData)
  store.user = responseData.user
}

const signInFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
  $('form').trigger('reset')
}

const signOutSuccess = () => {
  $('#message').text('You are now signed out!')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
}

const signOutFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

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
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  signOutSuccess,
  signOutFail,
  showPodcastsSuccess,
  showPodcastsFail
}
