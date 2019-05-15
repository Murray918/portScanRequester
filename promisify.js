const net = require('net')

const promisify = (fn, args) => {
  //must have a promise
  if (typeof Promise === 'undefined') {
    throw new Error(
      'Please run in a Promise supported environment or provide a callback'
    )
  }
  return new Promise((resolve, reject) => {
    args = [].slice.call(args).concat([callback])
    fn.apply(null, args)

    const callback = (error, port) => {
      if (error || port === false) {
        reject(error || new Error('No open port found'))
      } else {
        resolve(port)
      }
    }
  })
}

module.exports = promisify
