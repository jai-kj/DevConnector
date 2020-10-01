const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')

const User = require("../../models/User")

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post(
  "/", 
  [
    check('name', "Please enter a Name")
      .not()
      .isEmpty(),
    check('email', "Please enter a valid Email")
      .isEmail(),
    check('password', "Please enter a valid Password with minimum 6 characters")
      .isLength({ min: 6 })
  ], 
  async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
      // Check if user exists
      let user = await User.findOne({ email })
      if(user) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] }) 
      }
  
      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      })

      user = new User({
        name,
        email,
        avatar,
        password
      })

      // Encrypt the password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

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