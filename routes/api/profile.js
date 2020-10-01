const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route  GET api/profile/me
// @desc   Get Current User Profile
// @access Private
router.get("/me", auth, async(req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.user.id })
      .populate('user', [ 'name', 'avatar' ])

    if(!profile) {
      return res.status(400).json({ msg: 'Profile not Found for the User' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ errors: [{ msg: "Server Error" }] }) 
  }
})

module.exports = router