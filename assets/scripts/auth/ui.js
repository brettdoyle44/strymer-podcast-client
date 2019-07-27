'use strict'

const store = require('../store')
const showIntroScreen = require('../templates/sign-up.handlebars')

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
  // $('.sign-up-row').addClass('hide')
  // $('.sign-in-row').addClass('hide')
  // $('.strymer-logo').addClass('hide')
  // $('.strymer-welcome').addClass('hide')
  // $('.or-text').addClass('hide')
  // $('.top-area').removeClass('hide')
  store.user = responseData.user
}

const signInFail = () => {
  $('#message').text('Something went wrong')
  $('#message').removeClass('alert-success')
  $('#message').addClass('alert-danger')
  $('form').trigger('reset')
}

const signOutSuccess = () => {
  $('nav').remove()
  $('main').empty()
  const introScreen = showIntroScreen()
  $('main').append(introScreen)
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
