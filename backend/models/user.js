import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Correo electrónico inválido",
    },
  },
})

const User = mongoose.model("User", userSchema)
export default User
