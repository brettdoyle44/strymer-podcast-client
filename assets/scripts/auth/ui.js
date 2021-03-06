'use strict'

const store = require('../store')
const showIntroScreen = require('../templates/sign-up.handlebars')
const showSuccessMessage = require('../templates/success-message.handlebars')
const showFailureMessage = require('../templates/failure-message.handlebars')
const successMessage = showSuccessMessage()
const failureMessage = showFailureMessage()
const podcastApi = require('../podcast/api')
const podcastUi = require('../podcast/ui')

const signUpSuccess = responseData => {
  $('main').prepend(successMessage)
  $('.alert-success').text('You signed-up successfully, please sign-in.')
  $('form').trigger('reset')
  $('.sign-up-row').addClass('hide')
  $('.or-text').addClass('hide')
  $('.alert-success').fadeOut(1500)
}

const signUpFail = () => {
  const failureMessage = showFailureMessage()
  $('main').prepend(failureMessage)
  $('.alert-danger').text('Something went wrong')
  $('form').trigger('reset')
  $('.alert-danger').fadeOut(1500)
}

const signInSuccess = responseData => {
  $('form').trigger('reset')
  $('main').empty()
  store.user = responseData.user
  podcastApi.showPodcasts()
    .then(podcastUi.showPodcastsSuccess)
    .catch(podcastUi.showPodcastsFail)
}

const signInFail = () => {
  $('main').prepend(failureMessage)
  $('form').trigger('reset')
  $('.alert-danger').text('Something went wrong')
  $('.alert-danger').fadeOut(1500)
}

const signOutSuccess = () => {
  $('nav').remove()
  $('main').empty()
  const introScreen = showIntroScreen()
  $('main').append(introScreen)
  $('main').prepend(successMessage)
  $('#addSheet').remove()
  $('.alert-success').text('You signed-out successfully!')
  $('.alert-success').fadeOut(1500)
}

const signOutFail = () => {
  $('main').prepend(failureMessage)
  $('.alert-danger').text('Something went wrong')
  $('.alert-danger').fadeOut(1500)
}

const changePassSuccessful = responseData => {
  $('main').prepend(successMessage)
  $('.alert-success').text('You successfully changed your password.')
  $('form').trigger('reset')
  $('.alert-success').fadeOut(1500)
}

const changePassFailure = () => {
  $('main').prepend(failureMessage)
  $('.alert-danger').text('Something went wrong')
  $('.alert-danger').fadeOut(1500)
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
