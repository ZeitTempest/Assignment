import React, { useEffect, useContext, useState } from "react"
import { useParams, Link } from "react-router-dom"
import StateContext from "../StateContext"
import Axios from "axios"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Button, Tooltip, setRef } from "@mui/material"
// import PlanDialog from "./Plan/PlanDialog"
// import AddTaskDialog from "./AddTaskDialog"
import Page from "../components/Page"
import TaskBoard from "./TaskBoard"

function Kanban() {
  let { appName } = useParams()
  const appState = useContext(StateContext)
  const [permitted, setPermitted] = useState(false)
  const [openPlan, setOpenPlan] = useState(false)
  const [openAddTask, setOpenAddTask] = useState(false)
  const [plans, setPlans] = useState([])

  function handlePlans() {
    setOpenPlan(true)
  }

  function handleClose() {
    setOpenPlan(false)
  }

  function handleAddTask() {
    setOpenAddTask(true)
  }

  function handleCloseTask() {
    setOpenAddTask(false)
  }

  async function checkPL() {
    try {
      const app = appName
      const response = await Axios.post("/app/permit", { app })
      const groupname = response.data[0].App_permit_Create
      if (groupname) {
        try {
          const res = await Axios.post("/verifyAccessGroup", { groupname })
          setPermitted(res.data)
        } catch (err) {
          console.log(err)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function getPlans() {
    setPlans([])
    try {
      const response = await Axios.post("/plan/list", { appName })
      const list = []
      response.data.forEach(plan => {
        list.push(plan.Plan_MVP_name)
      })
      setPlans(list)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkPL()
  }, [appState.loggedIn])

  useEffect(() => {
    getPlans()
  }, [])

  return (
    <Page title={appName}>
      <div className="bg-blue-gray-100 flex justify-center items-center h-screen w-screen px-6 mx-auto lg:py-0">
        <div className="justify-center items-center rounded-lg sm:max-w-lg xl:p-0 shadow border bg-white border-gray-300 flex w-screen h-3/5">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-blue-900">Kanban</div>
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Kanban
