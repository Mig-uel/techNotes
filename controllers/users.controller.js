const User = require('../models/user.model')
const Note = require('../models/note.model')
const bcrypt = require('bcrypt')
const { asyncHandler } = require('../utils/asyncHandler')
const { errorResponse } = require('../utils/errorResponse')

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').lean()

  if (!users?.length) {
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
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body

  // confirm data
  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== 'boolean'
  ) {
    errorResponse('All fields are required', 400)
  }

  const user = await User.findById(id)

  if (!user) {
    errorResponse('User not found', 404)
  }

  // check for duplicates
  const isDuplicate = await User.findOne({ username }).lean()

  // allow updates to the original user
  if (isDuplicate && isDuplicate._id.toString() !== id) {
    errorResponse('Username already exists', 409)
  }

  user.username = username
  user.roles = roles
  user.active = active

  if (password) {
    const salt = 10
    // hash password
    user.password = await bcrypt.hash(password, salt)
  }

  const updatedUser = await user.save()

  return res.status(200).json({
    message: `${updatedUser.username} updated`,
  })
})

/**
 * @desc Delete a user
 * @route DELETE /users
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    errorResponse('User ID Required', 400)
  }

  const note = await Note.findOne({
    user: id,
  })

  if (note) {
    errorResponse('User has assigned notes', 400)
  }

  const user = await User.findById(id)

  if (!user) {
    errorResponse('User not found', 404)
  }

  const result = await user.deleteOne()

  const response = `${result.username} has been deleted`

  return res.status(200).json({ message: response })
})

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
}
