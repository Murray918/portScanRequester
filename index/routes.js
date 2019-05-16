const router = require('express').Router()
const homeLoggingPorts = require('./controller')

router.get('/', homeLoggingPorts)
router.post('/', homeLoggingPorts)

module.exports = router
