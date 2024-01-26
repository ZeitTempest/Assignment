const mysql2 = require("mysql2")

function getConnection() {
  var connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "nodelogin",
  })

  return connection
}

const executeQuery = (query) => {
  var connection = getConnection()
  connection.connect()
  return new Promise((resolve, reject) => {
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
