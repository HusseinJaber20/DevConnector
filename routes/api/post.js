const express = require('express')
const router = express.Router()

// @route  GET api/posts
// @desc   Test route
// @access Public -> don't need a token

router.get('/', (req,res) => {
    res.send('Post route')
})

module.exports = router;