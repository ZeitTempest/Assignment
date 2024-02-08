import mysql2 from "mysql2"
import dotenv from "dotenv"
dotenv.config({ path: "./src/config/.env" })

const { CONNECTIONLIMIT, MYHOST, MYUSER, MYPASSWORD, MYDB, MYDBPORT } = process.env

const mysqlCredentials = {
  connectionLimit: CONNECTIONLIMIT,
  host: MYHOST,
  user: MYUSER,
  password: MYPASSWORD,
  database: MYDB
  //port: MYDBPORT
}

function getConnection() {
  var connection = mysql2.createPool(mysqlCredentials)
  return connection
}

//alternate query method
export const executeQuery = query => {
  var connection = getConnection()
  //connection.connect - may be redundant with pooling
  return new Promise((resolve, reject) => {
    //should this entire connection portion be in here or in the method using it?
    connection.execute(query, function (error, results, fields) {
      //connection.end() - may be redundant with pooling
      if (error) {
        reject(error)
      } //if we get an error from db
      else resolve(results)
    })
  })
}

export const executeQuery2 = async (query, data) => {
  var connection = getConnection()
  const [results, fields] = await connection.execute(query, data)
  console.log(results)
  console.log(fields)
  if (error) {
    reject(error)
  } //if we get an error from db
  else resolve(results)
}

// module.exports = {
//   executeQuery
// }
