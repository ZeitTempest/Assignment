import mysql2 from "mysql2"

const { CONNECTIONLIMIT, MYHOST, MYUSER, MYPASSWORD, MYDB } = process.env

const mysqlCredentials = {
  connectionLimit: CONNECTIONLIMIT,
  host: MYHOST,
  user: MYUSER,
  password: MYPASSWORD,
  database: MYDB
}

function getConnection() {
  var connection = mysql2.createPool(mysqlCredentials)
  return connection
}

export const executeQuery = query => {
  var connection = getConnection()
  connection.connect
  console.log("query working")
  return new Promise((resolve, reject) => {
    //confirm what promise does
    //should this entire connection portion be in here or in the method using it?
    connection.execute(query, function (error, results, fields) {
      connection.end()
      if (error) {
        reject(error)
      } //if we get an error from db
      else resolve(results)
    })
  })
}

// module.exports = {
//   executeQuery
// }
