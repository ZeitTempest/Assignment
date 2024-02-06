import { findByUsername } from "../models/authModel.js"
import { isAlphanumeric } from "../utils.js"
import jwt from "jsonwebtoken"

const secret = process.env.JWTSECRET

export const userLoginResult = async (req, res) => {
  const { username, password } = req.body
  const usernameCompliant = isAlphanumeric(username) //simple check for username compliance to reduce server load

  if (!usernameCompliant) {
    return res.status(401).json({
      success: false,
      err: "username non compliant"
    })
  }

  try {
    const usersList = await findByUsername(username)

    if (usersList.length != 1) return res.status(401).json({ success: false, err: "no users found" })

    //const isPwdCorrect =  bcrypt.compareSync(password, users[0].password)
    const pwdCheck = password === usersList[0].password

    if (!pwdCheck) {
      return res.status(401).json({ success: false, err: "wrong password" })
    }

    //jwt token here
    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
    res.cookie("jwt", token, {
      // httpOnly: true, // cannot access cookie via js in client
      // secure: true, // Only sent over HTTPS
      maxAge: 3600000 // expiration milliseconds
      // sameSite: "strict", // Restricts the cookie to be sent only with requests originating from the same site
    })

    res.status(200).json({ success: true })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

// export default {
//   userLoginResult
// }
