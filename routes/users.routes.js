const express = require('express')

// controllers
const {
  createNewUser,
  deleteUser,
  getAllUser,
  updateUser,
} = require('../controllers/users.controller')

const router = express.Router()

router
  .route('/')
  .get(getAllUser)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser)

module.exports = router
