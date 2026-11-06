import jwt from "jsonwebtoken"
import User from "../models/user.js"

const ERROR_UNAUTHORIZED = 401
const ERROR_NOT_FOUND = 404

//Inicio sesión con email
const login = async (req, res, next) => {
  try {
    const { email } = req.body

    if (!email) {
      return res
        .status(ERROR_UNAUTHORIZED)
        .send({ message: "All fields are mandatory." })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(ERROR_UNAUTHORIZED).send({ message: "Incorrect email" })
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    )

    return res.status(200).json({
      message: "Successful login",
      token,
      email,
    })
  } catch (error) {
    return next(error)
  }
}

//Mostrar información del estudiante
const getCurrentUser = async (req, res, next) => {
  try {
    const id = req.user._id

    if (!id) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      })
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      })
    }

    return res.status(200).json(user)

  } catch (error) {
    return next(error)
  }
}

export { login, getCurrentUser }
