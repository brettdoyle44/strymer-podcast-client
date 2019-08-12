'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
// const podcastUi = require('../podcast/ui')
// const podcastApi = require('../podcast/api')

const showAccountPage = require('../templates/account-page.handlebars')

const removeActive = () => {
  $('#favorites').removeClass('nav-active')
  $('#settings').removeClass('nav-active')
  $('#home').removeClass('nav-active')
}

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
    .catch(ui.signInFail)
}

const onSettingButton = event => {
  event.preventDefault()
  removeActive()
  $('main').empty()
  const accountPage = showAccountPage()
  $('#settings').addClass('nav-active')
  $('main').append(accountPage)
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
