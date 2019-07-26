'use strict'

const store = require('../store')

const signUpSuccess = responseData => {
  $('#message').text('You signed-up successfully, please sign-in.')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
  $('form').trigger('reset')
  $('.sign-up-row').addClass('hide')
  $('.or-text').addClass('hide')
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
  $('.sign-up-row').addClass('hide')
  $('.sign-in-row').addClass('hide')
  $('.strymer-logo').addClass('hide')
  $('.strymer-welcome').addClass('hide')
  $('.or-text').addClass('hide')
  $('.top-area').removeClass('hide')
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
  $('.podcast-index').addClass('hide')
  $('.top-area').addClass('hide')
  $('.favorite-index').addClass('hide')
  $('.episode-index').addClass('hide')
  $('.favorite-podcast').addClass('hide')
  $('#password-btn').addClass('hide')
  $('#sign-out').removeClass('hide')
  $('.sign-up-row').removeClass('hide')
  $('.sign-in-row').removeClass('hide')
  $('.strymer-logo').removeClass('hide')
  $('.strymer-welcome').removeClass('hide')
  $('.or-text').removeClass('hide')
  $('#sign-out').addClass('hide')
}

const signOutFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
}

const changePassSuccessful = responseData => {
  $('#message').text('You changed your password successfully')
  $('#message').removeClass('alert-danger')
  $('#message').addClass('alert-success')
  $('form').trigger('reset')
}

const changePassFailure = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  signUpFail,
  signInSuccess,
  signInFail,
  signOutSuccess,
  signOutFail,
  changePassSuccessful,
  changePassFailure
}
