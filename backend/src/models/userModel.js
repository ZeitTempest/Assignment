import { isAlphanumeric } from "../utils/utils.js"
import { executeQuery } from "../config/query.js"

export const findAll = async (onlyCols = [], excludeCols = []) => {
  // const allCols = ["username", "password", "email", "isActive", "secGrp"];
  // const excludeColsSet = new Set(excludeCols);
  // const getCols = (onlyCols?.length ? onlyCols : allCols).filter(
  //   (colName) => !excludeColsSet.has(colName)
  // );
  // console.log(getCols.join(", "));
  // const getUserByIdQry = `SELECT ${allCols.join(", ")} FROM accounts;`;

  const findAllQry = `SELECT username, email, isActive, secGrp FROM accounts;`;

  try {
    const [users] = await executeQuery(findAllQry);
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export const findByUsername = async (username) => {
  const getUserByIdQry = `SELECT * FROM accounts WHERE username='${username}';`;

  try {
    const [res] = await executeQuery(getUserByIdQry);

    // multiple results found,
    // should not happen in db as id is unique
    // fix data problem if so
    if (res.length > 1) {
      const error = new Error("multiple rows found");
      error.code = 500;
      throw error;
    }

    // one or no rows should be returned
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const createUser = async ({ username, password, email, groups }) => {
  try {
    const createUserQry = `
      INSERT INTO accounts (username, password, email, secGrp) values ('${username}', '${password}', '${email}', '${groups}');
    `;
    const createdUser = await executeQuery(createUserQry);

    if (createdUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected");
    }

    return createdUser;
  } catch (err) {
    throw new Error(err);
  }
};

export const editUser = async ({
  username,
  password,
  email,
  isActive,
  secGrp,
}) => {
  try {
    const updateUserQry = `UPDATE accounts SET password='${password}', email='${email}', isActive='${
      isActive ? 1 : 0
    }', secGrp=${secGrp ? `'${secGrp}'` : null} WHERE username='${username}';`;

    console.log("query is", updateUserQry);
    const updatedUser = await executeQuery(updateUserQry);
    if (updatedUser[0].affectedRows !== 1) {
      throw new Error("more than one row affected");
    }
    return updatedUser;
  } catch (err) {
    throw new Error(err);
  }
};



// export const getAllUsers = async () => {
//   //returns list of every user
//   const getAllUsersQuery = `SELECT * FROM accounts;`
//   try {
//     const [users] = await executeQuery.query(getAllUsersQuery)
//     return users
//   } catch (e) {
//     throw new Error(e)
//   }
// }

// export const findByUsername = async username => {
//   try {
//     // prepared statement!
//     // const sql = "SELECT * FROM `accounts` WHERE `username` = ?"
//     // const [results, fields] = await executeQuery(sql, username)
//     // console.log("asdf")
//     // return { success: true, data: results }

//     const findByUsernameQuery = `SELECT * FROM accounts WHERE username='${username}';`
//     const res = await executeQuery(findByUsernameQuery, username)

//     //if more than 1 result (unexpected)
//     // if (res.length > 1) {
//     //   const error = new Error("more than 1 result")
//     //   error.code = 500
//     //   throw error
//     // }
//     return res
//   } catch (e) {
//     console.log(e)
//     throw new Error(e)
//   }
// }


export default {
  createUser,
  findAll,
  findByUsername,
  editUser,
};
