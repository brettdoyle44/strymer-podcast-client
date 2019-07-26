'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const podcastUi = require('../podcast/ui')
const podcastApi = require('../podcast/api')

const onSignUp = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFail)
}

const onSignIn = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccess)
    .then(podcastApi.showPodcasts()
      .then(podcastUi.showPodcastsSuccess)
      .catch(podcastUi.showPodcastsFail))
    .catch(ui.signInFail)
}

const onSettingButton = event => {
  event.preventDefault()
  $('.podcast-index').addClass('hide')
  $('.favorite-index').addClass('hide')
  $('.episode-index').addClass('hide')
  $('.favorite-podcast').addClass('hide')
  $('#password-btn').removeClass('hide')
  $('#sign-out').removeClass('hide')
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFail)
}

const onChangePass = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  api.changePass(formData)
    .then(ui.changePassSuccessful)
    .catch(ui.changePassFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePass,
  onSettingButton
}
