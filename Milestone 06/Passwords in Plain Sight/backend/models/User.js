import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Enforces basic password length criteria
      select: false, // Prevents password from leaking in default queries
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
