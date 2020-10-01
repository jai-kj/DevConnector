const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post("/", 
  [
    check('name', "Please enter a Name")
      .not()
      .isEmpty(),
    check('email', "Please enter a valid Email")
      .isEmail(),
    check('password', "Please enter a valid Password with minimum 6 characters")
      .isLength({ min: 6 })
  ], 
  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    
    console.log(req.body);
    res.send("User Route");
  }
)

module.exports = router