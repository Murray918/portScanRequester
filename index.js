const express = require('express')
//our modules that we have defined
const homeRoutes = require('./index/routes')

//set up our port
const PORT = process.env.PORT || 8080

//initialize express
let app = express()

app.use('/', homeRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
