// import { isAlphanumeric } from "../utils/utils.js"
import sql from "../config/query.js"

export const findAllUsers = async () => {
  // const allCols = ["username", "password", "email", "isActive", "group"];
  // const excludeColsSet = new Set(excludeCols);
  // const getCols = (onlyCols?.length ? onlyCols : allCols).filter(
  //   (colName) => !excludeColsSet.has(colName)
  // );
  // console.log(getCols.join(", "));
  // const getUserByIdQry = `SELECT ${allCols.join(", ")} FROM accounts;`;

  const findAllQry = `SELECT \`username\`, \`email\`, \`isActive\`, \`groups\` FROM \`accounts\`;`

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
    return [users]
  } catch (err) {
    throw new Error(err)
  }
}

export const createUser = async ({ username, password, email, groups }) => {
  try {
    const createUserQry = `
      INSERT INTO accounts (\`username\`, \`password\`, \`email\`, \`groups\`) values ('${username}', '${password}', '${email}', '${groups}');
    `
    //console.log(createUserQry)
    const createdUser = await sql.query(createUserQry)

    if (createdUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }

    return createdUser
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const adminEditUser = async ({ username, password, email, isActive, groups }) => {
  try {
    const foundUsers = await findByUsername(username)

    const updateUserQry = `UPDATE \`accounts\` SET \`password\`='${password ? password : foundUsers[0].password}', \`email\`='${email ? email : foundUsers[0].email}', \`isActive\`='${isActive ? 1 : 0}', \`groups\`='${groups}' WHERE \`username\`='${username}';`

    const updatedUser = await sql.query(updateUserQry)
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }
    return updatedUser
  } catch (err) {
    console.log(err)
    throw new Error("admin update user query failed")
  }
}

export const editUserSelf = async ({ username, password, email }) => {
  try {
    const foundUsers = await findByUsername(username)

    const updateUserQry = `UPDATE tmsdatabase.accounts SET password = ? , email = ? WHERE username = ?`

    const updatedUser = await sql.query(updateUserQry, [password, email, username])
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected")
    }
    return updatedUser
  } catch (err) {
    console.log(err)
    throw new Error("user update self query failed")
  }
}

export const getAllUsers = async () => {
  //returns list of every user
  const getAllUsersQuery = `SELECT * FROM accounts;`
  try {
    const [users] = await sql.query.query(getAllUsersQuery)
    return users
  } catch (e) {
    throw new Error(e)
  }
}

export const findByUsername = async username => {
  try {
    // prepared statement!
    // const sql = "SELECT * FROM `accounts` WHERE `username` = ?"
    // const [results, fields] = await sql.query(sql, username)
    // console.log("asdf")
    // return { success: true, data: results }

    const findByUsernameQuery = `SELECT * FROM accounts WHERE username='${username}';`
    const res = await sql.query(findByUsernameQuery, username)

    //if more than 1 result (unexpected)
    // if (res.length > 1) {
    //   const error = new Error("more than 1 result")
    //   error.code = 500
    //   throw error
    // }
    return res
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export default {
  //findAllUsers,
  //createUser,
  //getAllUsers,
  //adminEditUser,
  //editUserSelf
}
