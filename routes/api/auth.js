const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route  Get api/auth
// @desc   Get user data
// @access Private
router.get("/", auth, async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ errors: [{ msg: "Server Error" }] })
  }
})

module.exports = router