import { findByUsername } from "../models/authModel.js"
import { isAlphanumeric } from "../utils/utils.js"
import jwt from "jsonwebtoken"
import brypt from "bcryptjs"

const secret = process.env.JWTSECRET
const expiresIn = "1h"

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

    if (usersList.length != 1) return res.status(401).json({ success: false, err: "users list length not equal to 1" })

    //const isPwdCorrect =  bcrypt.compareSync(password, users[0].password)
    const pwdCheck = password === usersList[0].password

    if (!pwdCheck) {
      return res.status(401).json({ success: false, err: "pwdCheck failed" })
    }

    //jwt token here
    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
    console.log(`token: ${token}`)
    res.cookie("jwt", token, {
      // httpOnly: true, // cannot access cookie via js in client
      // secure: true, // Only sent over HTTPS
      maxAge: 3600000 // expiration milliseconds
      // sameSite: "strict", // Restricts the cookie to be sent only with requests originating from the same site
    })
    res.status(200).json({ success: true, result: true, data: usersList[0].username })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

export const CheckGroup = async (username, groupname) => {
  try {
    const users = await findByUsername(username)
    if (users.length !== 1) {
      //user not found
      return false
    }
    const groupsData = users[0].groups
    // console.log(groupsData) //print full contents of groups

    return true
  } catch (e) {
    throw new Error(e)
  }
}

// export default {
//   userLoginResult
// }
