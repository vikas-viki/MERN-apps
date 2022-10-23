const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../Middlewares/fetchuser')

const JWT_SECRET = "vikasAbC"
let success = false;
// ROUTE 1:  Creating user POST 
router.post('/createuser',
  [
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('email', 'enter a unique value').isEmail(),
    body('password').isLength({ min: 5, max: 15 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //  Checks if the recieved request is satisfying the above condition or not.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });

      //  Checks if the user already exists in the database.
      if (user) {
        return res.status(400).json({ error: "Sorry the user already exists" })
      }
      // Generating salt and secpass(hash) of pass and salt
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)
      //  if not exists creates a new one
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      console.log(authToken)
      res.json({ success, authToken, salt, secPass })
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ "error": "erroe occured" })
    }
  })

// ROUTE 2 : 
router.post('/login',
  [
    body('email', 'enter a unique value').isEmail(),
    body('password', 'Password doesnot match with the specified username').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //  Checks if the recieved request is satisfying the above condition or not.
    if (!errors.isEmpty()) {
      return res.status(400).json({ "errors": "Please login with correct credentials"});
    }
    try {
      const {email,password} = req.body;
      let user = await User.findOne({ email })
      if(!user){
        return res.status(400).json({"error": "Please enter a valid credentials"})
      }


      const comparePassword = await bcrypt.compare(password,user.password);
      if(!comparePassword){
        return res.status(400).json({"error": "Please enter a valid password"})
      }

      const data = {
        user: {
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success,authToken})


    } catch (error) {
      console.log(error.message);
      res.status(400).send("Some error occured")
    }
  })
// Get loggedIn user result
router.post('/getUsesr',fetchuser,
  async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-Password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
      res.status(400).send("Some error occured")
  }
})
module.exports = router