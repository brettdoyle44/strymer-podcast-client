// HELPER EXAMPLE
// This helper would be used in a .handlebars file
// with the syntax {{math argument}}

'use strict'

const math = (num) => {
  return Math.floor(num / 60)
}

module.exports = math
