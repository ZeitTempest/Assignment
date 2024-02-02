import { executeQuery } from "../config/query.js"

export const userLoginResult = async ({ username, password }) => {
  try {
    const sql = "SELECT * FROM `accounts` WHERE `username` = ? AND `password` = ?"
    const values = [username, password]
    const [results, fields] = await executeQuery(sql, values)
    console.log(results)
    return { success: true, data: results }
  } catch (e) {
    throw new Error(e)
  }
}

// export default {
//   userLoginResult
// }
