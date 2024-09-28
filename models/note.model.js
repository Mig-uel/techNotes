const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence-generator')(mongoose)

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    completed: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

NoteSchema.plugin(AutoIncrement, {
  inc_field: 'ticket',
  id: 'ticketNums',
  start_seq: 500,
})

module.exports = mongoose.model('Note', NoteSchema)
