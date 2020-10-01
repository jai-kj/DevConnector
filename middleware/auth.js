const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
  // Get token from Header
  const token =  req.header("x-auth-token")

  //Check for no token
  if(!token) {
    return res.status(401).json({ msg: "No Token, Authorization Denied!"})
  }

  // Verify Token
  try {
    const decoded = jwt.verify(token, config.get("JWTSecret"))
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: "Token is Invalid!"})
  }
}