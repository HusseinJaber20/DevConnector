const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const gravatar = require('gravatar')
const byrcript = require('bcryptjs')

const User = require('../../models/User')

// @route  POST api/users
// @desc   Register a user
// @access Public -> don't need a token


// used the Check and VAlidationResult from the validator to validate the request's body
router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid Email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min : 6})
] , async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.status(400).json({ errors : errors.array()})
    }
    // Destructuring the req.body
    const {name, email, password} = req.body
    try{
        // Check if the user exists already
        let user = await User.findOne({email : email})
        if(user){
            return res.status(400).json({errors : [{message:'User already exists, choose another email :) '}]})
        }
        console.log('user not found')
        // get avatar
        const avatar = gravatar.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        console.log('avatar created')

        // Create the user
        user = new User({
            name,
            email,
            avatar,
            password
        })
        console.log('user created')
        // Encrypt the Password by the bycript 
        const salt = await byrcript.genSalt(10)
        user.password = await byrcript.hash(password,salt)
        console.log('Password Encrypted')
        await user.save()
    
        res.send('User Registered')

    } catch(err){
        console.error(err.message)
        res.send(500).send('Server error :(')
    }
})

module.exports = router;