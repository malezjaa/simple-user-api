const router = require('express').Router()
const User = require('../database/models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  })

  try {
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      res.status(401).json('Wrong password or username!')
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)

    const realPass = bytes.toString(CryptoJS.enc.Utf8)

    if (realPass !== req.body.password) {
      res.status(401).json('Wrong password or username!')
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '3d',
    })

    const { password, ...other } = user._doc

    res.status(200).json({ ...other, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
