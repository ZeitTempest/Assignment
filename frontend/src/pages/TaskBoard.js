import React, { useState, useContext, useEffect } from "react"

import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Tooltip } from "@mui/material"
import DispatchContext from "../DispatchContext"

import { logoutUser } from "../utils/auth"
import Axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function TaskBoard(props) {
  const [openTasks, setOpenTasks] = useState([])
  const [todoTasks, setTodoTasks] = useState([])
  const [doingTasks, setDoingTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])
  const [closedTasks, setClosedTasks] = useState([])
  const appName = props.appName

  const appDispatch = useContext(DispatchContext)

  async function getTasks(state) {
    try {
      const response = await Axios.post("/tasks", { state, appName })
      console.log(response.data)
      switch (state) {
        case "open":
          setOpenTasks(response.data)
          break
        case "todo":
          setTodoTasks(response.data)
          break
        case "doing":
          setDoingTasks(response.data)
          break
        case "done":
          setDoneTasks(response.data)
          break
        case "closed":
          setClosedTasks(response.data)
          break
        default:
          break
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTasks("open")
    getTasks("todo")
    getTasks("doing")
    getTasks("done")
    getTasks("closed")
  }, [])

  const navigate = useNavigate()

  return (
    <div className="bg-blue-gray-100 flex justify-center items-center h-screen w-screen px-6 mx-auto lg:py-0">
      <div className="justify-center items-center rounded-lg sm:max-w-lg xl:p-0 shadow border bg-white border-gray-300 flex w-screen h-3/5">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-blue-900">TaskBoard</div>
        </div>
      </div>
    </div>
  )
}
export default TaskBoard
