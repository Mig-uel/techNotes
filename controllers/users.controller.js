const User = require('../models/user.model')
const Note = require('../models/note.model')
const bcrypt = require('bcrypt')
const { asyncHandler } = require('../utils/asyncHandler')

/**
 * @desc Get all users
 * @route GET /users
 * @access Private
 */
const getAllUser = asyncHandler(async (req, res) => {})

/**
 * @desc Create new user
 * @route POST /users
 * @access Private
 */
const createNewUser = asyncHandler(async (req, res) => {})

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
