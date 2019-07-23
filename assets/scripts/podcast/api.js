'use strict'

const config = require('../config')

// const store = require('../store')

const showPodcasts = () => {
  return $.ajax({
    url: config.apiUrl + '/podcasts',
    method: 'GET'
  })
}

module.exports = {
  showPodcasts
}
