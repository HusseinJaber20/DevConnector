const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const byrcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

// @route  GET api/auth
// @desc   Get the user's info from the token. Passed by a middleware function 
// @access Public 

router.get('/', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err){
        console.error(err.message)
        res.send(500).json({msg: 'Server Error :('})
    }
})


// @route  POST api/auth
// @desc   Check if the LOGIN is valid. If it is, return the corresponding token 
// @access Public 
router.post('/', [
    check('email','Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists()
] , async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ errors : errors.array()})
    }
    // Destructuring the req.body
    const {email, password} = req.body
    try{
        // Check if the user exists
        let user = await User.findOne({email : email})
        if(!user){
            return res.status(400).json({errors : [{message:'Invalid Credentials'}]})
        }

        const isMatch = await byrcript.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors : [{message:'Invalid Credentials'}]})
        }

        const payload = {
            user : {
                id : user.id
            }
        }

        jwt.sign(payload,
            config.get('jwtSecret'),
            {
                 expiresIn : 36000 
            },
            (err,token) => {
                if(err){
                    throw err
                }
                res.json({token})
            }
        )

    } catch(err){
        console.error(err.message)
        res.send(500).send('Server error :(')
    }
})

module.exports = router;