const express = require("express")

const app = express()
const port = 3000
//const cors = require("cors")

const dotenv = require("dotenv")
const bodyParser = require("body-parser")

// Inititalize the app and add middleware
// app.set("view engine", "pug") // Setup the pug
//app.use(bodyParser.urlencoded({ extended: true })) // Setup the body parser to handle form submits
//app.use(session({ secret: "super-secret" })) // Session setup

// Setting up config.env file variables
dotenv.config({ path: "./src/config/.env" })

app.use(express.json())
//app.use(cors())

/** Handle login display and form submit */
app.get("/login", (req, res) => {
  if (req.session.isLoggedIn === true) {
    return res.redirect("/")
  }
  res.render("login", { error: false })
})

app.post("/login", (req, res) => {
  const { username, password } = req.body
  console.log("request received " + username + " " + password)

  return res.status(200).json({ message: "test" })
})

/** Handle logout function */
// app.get("/logout", (req, res) => {
//   req.session.isLoggedIn = false
//   res.redirect("/")
// })

/** Simulated bank functionality */
// app.get("/", (req, res) => {
//   res.render("index", { isLoggedIn: req.session.isLoggedIn })
// })

// app.get("/balance", (req, res) => {
//   if (req.session.isLoggedIn === true) {
//     res.send("Your account balance is $1234.52")
//   } else {
//     res.redirect("/login?redirect_url=/balance")
//   }
// })

// app.get("/account", (req, res) => {
//   if (req.session.isLoggedIn === true) {
//     res.send("Your account number is ACL9D42294")
//   } else {
//     res.redirect("/login?redirect_url=/account")
//   }
// })

// app.get("/contact", (req, res) => {
//   res.send("Our address : 321 Main Street, Beverly Hills.")
// })

/** App listening on port */
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`TMS App listening at http://localhost:${port}`)
})
