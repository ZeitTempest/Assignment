import React, { useEffect, useContext, useState } from "react"
import { useParams, Link } from "react-router-dom"
import StateContext from "../StateContext"
import Axios from "axios"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { Button, Tooltip, setRef } from "@mui/material"

import PlanDialog from "../components/dialog/PlanDialog"
import AddTaskDialog from "../components/dialog/AddTaskDialog"

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

  function handleCloseAddTask() {
    setOpenAddTask(false)
  }

  async function checkPL() {
    try {
      const response = await Axios.post("/app/permit", { appName })
      var groupname = null
      if (response.data.length > 0) {
        groupname = response.data[0].App_permit_Create
      } else console.log("failed to get any groups")
      if (groupname) {
        try {
          const res = await Axios.post("/verifyAccessGroup", { groupname })
          setPermitted(res.data.userIsInGroup)
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
      const response = await Axios.post("/plans/list", { appName })
      const list = []

      response.data.forEach((plan) => {
        response.status === 200 ? list.push(plan.Plan_MVP_Name) : list.push()
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
    <Page title={appName + " Kanban Board"}>
      <div className="bg-blue-gray-100 min-h-screen">
        <div className="flex items-center justify-center px-6 mx-auto lg:py-0">
          <div className="min-w-full rounded-lg shadow border md:mt-24 mb-2 sm:max-w-screen-lg xl:p-0 bg-white border-gray-300">
            <div className="flex space-x-6 sm:p-8 items-center justify-end">
              <div>
                <button
                  type="submit"
                  onClick={handlePlans}
                  className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center"
                >
                  Plans
                </button>
                <Dialog
                  open={openPlan}
                  onClose={handleClose}
                  fullWidth
                  maxWidth="lg"
                >
                  <DialogTitle>Plans</DialogTitle>
                  <DialogContent>
                    <PlanDialog />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                  </DialogActions>
                </Dialog>
              </div>
              {permitted ? (
                <div>
                  <button
                    type="submit"
                    onClick={handleAddTask}
                    className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center"
                  >
                    Add Task
                  </button>
                  <Dialog
                    open={openAddTask}
                    onClose={handleCloseAddTask}
                    fullWidth
                    maxWidth="lg"
                  >
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                      <AddTaskDialog
                        plans={plans}
                        setOpenAddTask={setOpenAddTask}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseAddTask}>Close</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="px-6 mt-6">
          <div className="w-full rounded-lg shadow border md:mt-0 xl:p-0 bg-white border-gray-300">
            <div className="sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-3xl text-center text-blue-900">
                {appName}
              </h1>
              <div className="sm:p-8">
                <TaskBoard appName={appName} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )

  // <div className="d-flex flex-column flex-md-row align-items-center p-30">
  //   <h4 className="my-20 mr-md-auto font-weight-normal">
  //     <Tooltip title="Applications" arrow>
  //       <Link to="/home" className="text-dark">
  //         <b>{appName}</b>
  //       </Link>
  //     </Tooltip>
  //   </h4>
  //   <button onClick={handlePlans} className="btn btn-sm btn-info">
  //     Plans
  //   </button>
  //   <Dialog open={openPlan} onClose={handleClose} fullWidth maxWidth="lg">
  //     <DialogTitle>Plans</DialogTitle>
  //     <DialogContent>
  //       <PlanDialog />
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={handleClose}>Close</Button>
  //     </DialogActions>
  //   </Dialog>
  //   <div className="text-white">...</div>
  //   {permitted ? (
  //     <>
  //       <button onClick={handleAddTask} className="btn btn-sm btn-success">
  //         Add Task
  //       </button>
  //       <Dialog open={openAddTask} onClose={handleCloseAddTask} fullWidth maxWidth="lg">
  //         <DialogTitle>Create Task for {appName}</DialogTitle>
  //         <DialogContent>
  //           <AddTaskDialog plans={plans} setOpenAddTask={setOpenAddTask} />
  //         </DialogContent>
  //       </Dialog>
  //     </>
  //   ) : (
  //     ""
  //   )}
  // </div>
  // <div className="mt-3">
  //   <TaskBoard appName={appName} />
  // </div>

  // return (
  //   <Page title={appName}>
  //     <div className="bg-blue-gray-100 flex justify-center items-center h-screen w-screen px-6 mx-auto lg:py-0">
  //       <div className="justify-center items-center rounded-lg sm:max-w-lg xl:p-0 shadow border bg-white border-gray-300 flex w-screen h-3/5">
  //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
  //           <div className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-blue-900">Kanban</div>
  //         </div>
  //       </div>
  //     </div>
  //   </Page>
  // )
}
export default Kanban
