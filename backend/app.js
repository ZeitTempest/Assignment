import express from "express"
const app = express()

import cors from "cors"

import dotenv from "dotenv"
dotenv.config({ path: "./src/config/.env" })

import bodyParser from "body-parser"

// Inititalize the app and add middleware
// app.set("view engine", "pug") // Setup the pug
//app.use(bodyParser.urlencoded({ extended: true })) // Setup the body parser to handle form submits
//app.use(session({ secret: "super-secret" })) // Session setup

// Setting up config.env file variables

app.use(express.json()) //middleware for parsing json

app.use(cors())

/** Handle login display and form submit */
// app.get("/login", (req, res) => {
//   if (req.session.isLoggedIn === true) {
//     return res.redirect("/")
//   }
//   res.render("login", { error: false })
// })

// app.post("/login", (req, res) => {
//   const { username, password } = req.body
//   console.log("request received " + username + " " + password)

//   return res.status(200).json({ message: "test" })
// })

//Importing all routes
import router from "./src/routes/router.js"

/** App listening on port */
app.use("/", router)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`TMS App listening at http://localhost:${PORT}`)
})
