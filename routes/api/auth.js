const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

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

// @route  POST api/auth
// @desc   Login user | Authenticate and Return Token
// @access Public
router.post(
  "/", 
  [
    check('email', "Please enter a valid Email")
      .isEmail(),
    check('password', "Please enter a Password")
      .exists()
  ], 
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body
    try {
      // Check if user exists
      let user = await User.findOne({ email })
      if(!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }) 
      }

      // Match Password 
      const isMatch = await bcrypt.compare(password, user.password)
      if(!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] }) 
      }

      // Return JWT
      const payload = {
        user :{
          id: user.id
        }
      }

      jwt.sign(
        payload, 
        config.get("JWTSecret"), 
        { expiresIn: 360000 },
        (err, token) => {
        if(err) throw err
        res.json({ 
          success: true, 
          token 
        })
      })
      
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ errors: [{ msg: "Server Error" }] })
    }
  }
)

module.exports = router