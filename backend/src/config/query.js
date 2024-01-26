const mysql2 = require("mysql2")

function getConnection() {
  var connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "nodelogin", //rename db
  })

  return connection
}

const executeQuery = (query) => {
  var connection = getConnection()
  connection.connect()
  return new Promise((resolve, reject) => {
    //confirm what promise does
    //should this entire connection portion be in here or in the method using it?
    connection.query(query, function (error, results, fields) {
      connection.end()
      if (error) {
        reject(error)
      } //if we get an error from db
      else resolve(results)
    })
  })
}

module.exports = {
  executeQuery,
}
