'use strict'

//require the file system module
const fs = require('fs')

//use the file system module to write to a file
fs.writeFile('./tmp/test', 'Hey there!', function(error) {
  //if there is an error return it
  if (error) {
    return console.log(error)
  }

  console.log('The file was saved!')
})
