import { createUser, findByUsername } from "../models/userModel.js"
import { isAlphaNumeric, passwordCompliant, emailCompliant } from "../utils/utils.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const secret = process.env.JWTSECRET
const expiresIn = "1h"

export const userLogin = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const foundUsers = await findByUsername(username)
    if (foundUsers.length != 1) return res.status(401).json({ success: false, err: "users list length not equal to 1" })

    const pwdCheck = bcrypt.compareSync(password, foundUsers[0].password)
    //const pwdCheck = password === foundUser.password

    if (!pwdCheck) {
      return res.status(401).json({ success: false, err: "pwd check failed" })
    }

    //jwt token here
    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
    //console.log(`token: ${token}`)
    res.status(200).json({ success: true, result: true, data: foundUsers.username, jwt: token })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

export const CheckGroup = async (username, groupname) => {
  try {
    const foundUser = await findByUsername(username)
    if (foundUser.length !== 1) {
      //user not found
      return false
    }
    //console.log("checkgroup")
    //console.log(foundUser[0].groups)
    return foundUser[0].groups.split(",").includes(groupname)
  } catch (e) {
    throw new Error(e)
  }
}

export const adminRegister = async (req, res) => {
  try {
    const { username, password, email, groups } = req.body

    // check submitted JWT is a valid admin
    const isAdmin = await CheckGroup(req.byUser, "admin")

    if (!isAdmin) {
      return res.status(401).json("User is not an admin.")
    }

    // verify fits constraints
    const usernameMeetsContraints = isAlphaNumeric(username) && username.length >= 3 && username.length <= 20

    if (!usernameMeetsContraints) {
      return res.status(401).json("Invalid username.")
    }

    const passwordMeetsContraints = passwordCompliant(password) && password.length >= 8 && password.length <= 10

    if (!passwordMeetsContraints) {
      return res.status(401).json("Invalid password.")
    }

    const emailMeetsContraints = emailCompliant(email)

    if (!emailMeetsContraints) {
      return res.status(401).json("Invalid email.")
    }
    // verify groups are valid
    // const allGroups = await groups.findAll()
    // const GroupsSet = new Set(allGroups.map(row => row.groupname))

    // let invalidGrps = ""
    // for (const grp of groups) {
    //   if (!GroupsSet.has(grp)) {
    //     invalidGrps += grp
    //   }
    // }

    // if (invalidGrps) {
    //   return res.status(401).json(`${invalidGrps} group does not exists, please create them first`)
    // }

    // find if user already exists
    let user = await findByUsername(username)

    // reject if user already exists
    if (user.length >= 1) {
      return res.status(401).json("User already exists")
    }

    // create hash
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    user = await createUser({
      ...req.body,
      password: hash,
      groups: groups.join(",")
    })

    //what is the purpose of this sign?
    const token = jwt.sign({ username }, secret, { expiresIn })

    if (!token || !user) {
      return res.status(401).json({ success: false, err: "failed to create user" })
    }

    res.status(200).json({ data: { token, user } })
  } catch (err) {
    console.log(err)
    res.status(500).json(err) //wtf is error.code???
  }
}

export const verifyAccessGroup = async (req, res) => {
  try {
    const { groupname } = req.body
    const username = req.byUser
    const userIsInGroup = await CheckGroup(username, groupname)
    return res.status(200).json({ success: true, userIsInGroup })
  } catch (err) {
    console.log(err)
    res.status(500).json("failed to verify access")
  }
}
