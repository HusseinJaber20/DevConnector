const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const {check, validationResult} = require('express-validator')

// @route  GET api/profile/me
// @desc   Get a specific profile 
// @access Private

router.get('/', auth , async (req,res) => {
    try{
        const profile = await Profile.findOne({user : req.user.id}).populate('users',['name','avatar'])
        if(!profile){
            return res.status(400).send({msg: 'There is no profile for this user'})
        }
        res.json(profile)
    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Error :(')
    }
})

// @route  POST api/profile
// @desc   Create or Update a profile
// @access Private

router.post('/', [auth, [
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is Required').not().isEmpty()
]],async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {company,website,location,bio,status,githubusername,skills,youtube,facebook,linkedin,instagram,twitter} = req.body

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id
    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills){
        profileFields.skills = skills.split(',').map(skill =>skill.trim());
    } 
    
    // Build Social Object
    profileFields.social = {}
    if(twitter) profileFields.social.twitter = twitter
    if(facebook) profileFields.social.facebook = facebook
    if(youtube) profileFields.social.youtube = youtube
    if(linkedin) profileFields.social.linkedin = linkedin
    if(instagram) profileFields.social.instagram = instagram

    try{
        let profile = await Profile.findOne({user : req.user.id})
        if(profile){
            // Update
            profile = await Profile.findOneAndUpdate({user : req.user.id},{$set : profileFields}, {new : true})
            return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)
        await profile.save()
        return res.json(profile)

    } catch(err){
        console.error(err.message)
        res.status(500).send('Server Failed :(')
    }

})

module.exports = router;