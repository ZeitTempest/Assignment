//import { adminEditUser, editUserSelf, createUser } from "../models/userModel.js"
import { isAlphaNumeric, passwordCompliant, emailCompliant } from "../utils/utils.js"
import bcrypt from "bcryptjs"

import sql from "../config/query.js"

export const getAllUsers = async (req, res) => {
    try {
      const [users] = await sql
        .query(findAllQry)
        .then(results => {
          // Handle results here
          //console.log(results); // Make sure it logs the array of 2 users
          return results
        })
        .catch(error => {
          console.error("Error:", error)
        })
        res.status(200).json(users)
    } catch (err) {
      res.status(500).json(err)
    }
}

export const getUser = async (req, res) => {
  const getUserByIdQry = `SELECT * FROM \`accounts\` WHERE \`username\`='${req.byUser}';`
  try {    
      const [users] = await sql.query(getUserByIdQry)

      if (users.length < 1) {
        res.error("No users found")
      }
      if (users.length > 1) {
        res.error("More than one row found")
      }
  
      // one or no rows should be returned
      res.status(200).json(users[0])
    
  } catch (err) {
    console.log(err)
    res.status(500).json("Failed to get user by ID")
  }
}

export const adminUpdateUser = async (req, res) => {
    // console.log("req.body", req.body);
    let { username, password, email, isActive, groups } = req.body

    // verify fits constraints
    const usernameMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(val) && username.length >= 3 && username.length <= 20

    if (!usernameMeetsConstraints) {
      return res.status(401).json("Invalid username.")
    }

    //proper constraint check refer to this
    const passwordMeetsConstraints = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(password) && password.length >= 8 && password.length <= 10

    if (password && password != "" && !passwordMeetsConstraints) {
      console.log("admin update user")
      return res.status(401).json("Invalid password.")
    }

    var emailMeetsConstraints = true

    if (email !== "") {
      emailMeetsConstraints = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$").test(email)
    }

    if (!emailMeetsConstraints) {
      return res.status(401).json("Invalid email.")
    }

    // admin cannot be deleted, check if admin
    if (req.username === "admin" && (isActive === false || !groups.includes("admin"))) {
      return res.json("Admin cannot be disabled or removed from the admin group")
    }

    const foundUsers = await findByUsername(username) ///

    if (!foundUsers) {
      return res.status(404).send("User not found")
    }

    // password will not be updated if not provided
    password = password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : foundUsers[0].password

    groups = Array.isArray(groups) && groups.length !== 0 ? groups.join(",") : groups //if any change to groups, update groups

    // update user
    // await adminEditUser({
    //   username,
    //   password,
    //   email,
    //   isActive,
    //   groups
    // })

    
  try {
    const updateUserQry = `UPDATE \`accounts\` SET \`password\`='${password ? password : foundUsers[0].password}', \`email\`='${email ? email : foundUsers[0].email}', \`isActive\`='${isActive ? 1 : 0}', \`groups\`='${groups}' WHERE \`username\`='${username}';`

    console.log("query is", updateUserQry)
    const updatedUser = await sql.query(updateUserQry)
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }
    res.json("success") //
  } catch (err) {
    console.log(err)
    res.status(500).json("failed to update user info")
  }
} 


// check this
export const adminCreateUser = async (req, res) => { ///

  try {
    let { username, password, email, groups } = req.body

    var users = []
    // verify username does not exist in db
    try {    
      const [users] = await sql.query(`SELECT * FROM accounts WHERE username='${req.username}';`)
  
      // multiple results found,
      // should not happen in db as id is unique
      // fix data problem if so
      if (users.length < 1) {
        return("No users found")
      }
      if (users.length > 1) {
        return("More than one row found")
      }
  
      // one or no rows should be returned
      return users[0]
    
  } catch (err) {
    console.log(err)
    res.status(500).json("Failed to get user by ID")
  }
    
    if (foundUser){
      return res.status(401).json("User already exists")
    }

    // verify fits constraints
    const usernameMeetsConstraints =
    new RegExp("^[a-zA-Z0-9]+$").test(username) && username.length >= 3 && username.length <= 20

    if (!usernameMeetsConstraints) {
      return res.status(401).json("Invalid username")
    }

    const passwordMeetsConstraints = new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(password) && password.length >= 8 && password.length <= 10

    if (!passwordMeetsConstraints) {
      return res.status(401).json("Invalid password")
    }

    var emailMeetsConstraints = true

    if (email !== "") {
      emailMeetsConstraints = new RegExp("^[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]+$").test(email)
    }

    if (!emailMeetsConstraints) {
      return res.status(401).json("Invalid email")
    }

    //hash pw
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    // update user
    try {
      const createUserQry = `
        INSERT INTO accounts (\`username\`, \`password\`, \`email\`, \`groups\`) values ('${username}', '${password}', '${email}', '${groups}');
      `
      //console.log(createUserQry)
      const createdUser = await sql.query(createUserQry)
  
      if (createdUser[0].affectedRows !== 1) {
        throw new Error("more than one row affected")
      }
  
      return res.status(200).json("Created user", {result:"true"})
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
    // const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
    // res.cookie("jwt", token, { maxAge: 3600000 })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

// check this
export const updateUser = async (req, res) => {
  try {
    // admin cannot be deleted, check if admin
    let { password, email } = req.body

    // get which user is requesting
    const username = req.byUser

    // verify fits constraints
    const passwordMeetsConstraints = password && password != "" && (() => new RegExp("^(?=.*[0-9])(?=.*[!@#$%^?/&*])[a-zA-Z0-9!@#$%^?/&*]").test(password)) && password.length >= 8 && username.length <= 10

    if (!passwordMeetsConstraints && password) {
      return res.status(401).json("Invalid password")
    }

    const emailMeetsConstraints = emailCompliant(email)

    if (!emailMeetsConstraints && email) {
      return res.status(401).json("Invalid email")
    }

    // update user
    //const response = await editUserSelf({ username, password, email })

    var foundUser = null
    try {
    const [users] = await sql.query(`SELECT * FROM accounts WHERE username='${req.username}';`)

    
    if (users.length < 1) {
      return("No users found")
    }
    if (users.length > 1) {
      return("More than one row found")
    }
  
    foundUser = users[0]
     //hash pw
     password = password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : foundUser.password

    } catch (err) {
      console.log(err)
      res.status(500).json("Failed to get user by ID")
    }
  
    const updateUserQry = `UPDATE tmsdatabase.accounts SET password = ? , email = ? WHERE username = ?`

    console.log("query is", updateUserQry)
    const updatedUser = await sql.query(updateUserQry, [password, email, foundUser.username])
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }
      res.status(200).json("Success", {result:true})
    } catch (err) {
      console.log(err)
      throw new Error("user update self query failed")
    }
  }

// export const updateUser = async (req, res) => {
//   try {
//     // admin cannot be deleted, check if admin
//     const { password, email } = req.body

//     // get which user is requesting
//     const username = req.byUser

//     const user = await findById(username)

//     // update user
//     const res = await updateUser(username, password, email)

//     const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
//     res.cookie("jwt", token, { maxAge: 3600000 })
//     res.status(200).json()
//   } catch (err) {
//     res.status(500).json(err)
//   }
// }
