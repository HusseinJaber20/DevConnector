const express = require('express')
const router = express.Router()

// @route  GET api/auth
// @desc   Test route
// @access Public -> don't need a token

router.get('/', (req,res) => {
    res.send('Auth route')
})

module.exports = router;