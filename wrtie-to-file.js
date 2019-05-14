//require the file system module
const fs = require('fs')

//==> ==> ==> ==> UTIL FUNCTIONS <== <== <== <==
//1. use async await to check to see if the file exists
const checkIfFileExists = async path => {
  try {
    return await fs.existsSync(path)
  } catch (error) {
    return error
  }
}
//2. create a file and write to it => we will only do this if the file does not exist so we must check first
const createNewFileAndWriteToIt = async (path, data) => {
  try {
    return await fs.writeFileSync(path, data)
  } catch (error) {
    return error
  }
}
//3. append the data to the end of the file on a new line
const appendDataToExistingFile = async (path, data) => {
  try {
    return await fs.appendFileSync(path, data)
  } catch (error) {
    return error
  }
}

const writeToAFile = async (path, data) => {
  try {
    let exists = await checkIfFileExists(path)
    let result = 'write successful'
    if (exists === true) {
      data = `\n${data}`
      await appendDataToExistingFile(path, data)
    } else {
      await createNewFileAndWriteToIt(path, data)
    }
    console.table({
      path,
      data,
      exists,
      result
    })
  } catch (error) {
    console.error(error)
  }
}

// writeToAFile('./party.txt', 'hello party')
//use the file system module to write to a file
module.exports = writeToAFile
