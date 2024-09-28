const User = require('../models/user.model')
const Note = require('../models/note.model')
const bcrypt = require('bcrypt')
const { asyncHandler } = require('../utils/asyncHandler')

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()

  if (!users) {
    const error = new Error('No users found!')
    error.status = 404

    throw error
  }

  return res.status(200).json(users)
})

/**
 * @desc Create new user
 * @route POST /users
 * @access Private
 */
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password, roles } = req.body

  // confirm data
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    const error = new Error('All fields are required')
    error.status = 400

    throw error
  }

  // check for duplicate
  const isDuplicate = await User.findOne({
    username,
  })
    .lean()
    .exec()

  if (isDuplicate) {
    const error = new Error('Username already exists')
    error.status = 409

    throw error
  }

  // hash password
  const salt = 10
  const hashedPassword = await bcrypt.hash(password, salt)

  const userObject = {
    username,
    password: hashedPassword,
    roles,
  }

  // create and store new user
  const user = await User.create(userObject)

  if (!user) {
    const error = new Error('Invalid user data received')
    error.status = 400

    throw error
  }

  return res.status(200).json({ message: `${user.username} created` })
})

/**
 * @desc Update a user
 * @route PATCH /users
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {})

/**
 * @desc Delete a user
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {})

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
}
