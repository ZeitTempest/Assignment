import { executeQuery } from "../config/query.js"
import { isAlphanumeric } from "../utils/utils.js"

export const getAllUsers = async () => {
  //returns list of every user
  const getAllUsersQuery = `SELECT * FROM accounts;`
  try {
    const [users] = await executeQuery.query(getAllUsersQuery)
    return users
  } catch (e) {
    throw new Error(e)
  }
}

export const findByUsername = async username => {
  try {
    // prepared statement!
    // const sql = "SELECT * FROM `accounts` WHERE `username` = ?"
    // const [results, fields] = await executeQuery(sql, username)
    // console.log("asdf")
    // return { success: true, data: results }

    const findByUsernameQuery = `SELECT * FROM accounts WHERE username='${username}';`
    const res = await executeQuery(findByUsernameQuery, username)

    //if more than 1 result (unexpected)
    // if (res.length > 1) {
    //   const error = new Error("more than 1 result")
    //   error.code = 500
    //   throw error
    // }
    return res
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
