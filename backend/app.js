import express from "express"
import router from "./src/routes/router.js"
const app = express()

import cors from "cors"

import dotenv from "dotenv"
dotenv.config({ path: "./src/config/.env" })

import bodyParser from "body-parser"

// Inititalize the app and add middleware
app.use(express.json()) //middleware for parsing json
app.use(
  cors({
    origin: "http://localhost:4000",
    optionSuccessStatus: 200,
    credentials: true
  })
)

/** App listening on port */
app.use("/", router)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
  console.log(`TMS App listening at http://localhost:${PORT}`)
})
