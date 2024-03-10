//import { createUser } from "../models/userModel.js"
import { emailCompliant } from "../utils/utils.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import sql from "../config/query.js"

const secret = process.env.JWTSECRET
const expiresIn = "1h"

export const userLogin = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password

    var foundUser = null
    try {
      const getUsersQuery = `SELECT * FROM accounts WHERE username = ? ;`
      const [users] = await sql.query(getUsersQuery, [username])

      // multiple results found,
      // should not happen in db as id is unique
      // fix data problem if so

      if (users.length < 1) {
        return res.status(401).json("no users found") ///
      }
      if (users.length > 1) {
        return res.status(401).json("db found more than one user") ///
      }

      // one or no rows should be returned
      foundUser = users[0]
    } catch (err) {
      console.log(err)
      res.status(500).json("Failed to get user by ID")
    }

    const pwdCheck = bcrypt.compareSync(password, foundUser.password)
    //const pwdCheck = password === foundUser.password

    if (!pwdCheck) {
      return res.status(401).json("pwd check failed")
    }

    //jwt token here
    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
    res.status(200).json({
      success: true,
      result: true,
      data: foundUser.username,
      jwt: token,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export const Checkgroup = async (userid, groupname) => {
  try {
    var foundUser = null
    const checkGroupQuery = `SELECT * FROM accounts WHERE username = ? ;`
    const [users] = await sql.query(checkGroupQuery, [userid])

    // multiple results found,
    // should not happen in db as id is unique
    // fix data problem if so
    if (users.length < 1) {
      return false
    }
    if (users.length > 1) {
      return false
    }

    // one or no rows should be returned
    foundUser = users[0]

    return foundUser.groups.split(",").includes(groupname)
  } catch (err) {
    return res.status(500).send(err)
  }
}

export const adminRegister = async (req, res) => {
  try {
    const { username, password, email, groups } = req.body

    // check submitted JWT is a valid admin
    const isAdmin = await Checkgroup(req.byUser, "admin")

    if (!isAdmin) {
      return res.status(401).json("User is not an admin.")
    }

    // verify fits constraints
    const usernameMeetsConstraints =
      new RegExp("^[a-zA-Z0-9]+$").test(username) &&
      username.length >= 3 &&
      username.length <= 20

    if (!usernameMeetsConstraints) {
      return res.status(500).json("Invalid username.")
    }

    const passwordMeetsConstraints =
      new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(
        password
      ) &&
      password.length >= 8 &&
      password.length <= 10

    if (!passwordMeetsConstraints) {
      return res.status(500).json("Invalid password.")
    }

    const emailMeetsConstraints = new RegExp(
      "^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$"
    ).test(email)

    if (!emailMeetsConstraints) {
      return res.status(500).json("Invalid email.")
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
    //   return res.status(500).json(`${invalidGrps} group does not exists, please create them first`)
    // }

    // find if user already exists

    var user = null
    try {
      //adminedituser
      const [users] = await sql.query(
        `SELECT * FROM accounts WHERE username='${req.username}';`
      )

      // multiple results found,
      // should not happen in db as id is unique
      // fix data problem if so
      if (users.length < 1) {
        res.status(500).json({ success: false, err: "no users found" })
      }
      if (users.length > 1) {
        res
          .status(500)
          .json({ success: false, err: "db found more than one user" })
      }

      // one or no rows should be returned
      user = users[0]
    } catch (err) {
      console.log(err)
      res.status(500).json("Failed to get user by ID")
    }

    // reject if user already exists
    if (user.length >= 1) {
      return res.status(500).json("User already exists")
    }

    // create hash
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    // user = await createUser({
    //   ...req.body,
    //   password: hash,
    //   groups: groups.join(",")
    // })

    ;async () => {
      try {
        const createdUser = await sql.query(`
      INSERT INTO accounts (\`username\`, \`password\`, \`email\`, \`groups\`) values ('${username}', '${hash}', '${email}', '${groups.join(
          ","
        )}');
    `)

        if (createdUser[0].affectedRows !== 1) {
          throw new Error("more than one row affected")
        }

        return createdUser
      } catch (err) {
        console.log(err)
        throw new Error(err)
      }
    }
    //what is the purpose of this sign?
    const token = jwt.sign({ username }, secret, { expiresIn })

    if (!token || !user) {
      return res
        .status(500)
        .json({ success: false, err: "failed to create user" })
    }

    res.status(200).json({ data: { token, user } })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export const verifyAccessGroup = async (req, res) => {
  try {
    const { groupname } = req.body
    const username = req.byUser
    //console.log(req.body)

    const userIsInGroup = await Checkgroup(username, groupname)

    return res.status(200).json({ success: true, userIsInGroup })
  } catch (err) {
    console.log(err)
    res.status(500).json("failed to verify access")
  }
}
