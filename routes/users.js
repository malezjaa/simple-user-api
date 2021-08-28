const router = require('express').Router()
const User = require('../database/models/User')
const CryptoJS = require('crypto-js')
const verify = require('../utils/verify')

router.get('/get/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...other } = user._doc
    res.status(200).json(other)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString()
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      res.status(201).json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('You can update only your account!')
  }
})

router.delete('/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User deleted')
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json('You can delete only your account!')
  }
})

module.exports = router
