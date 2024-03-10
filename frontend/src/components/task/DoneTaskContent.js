import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Axios from "axios"
import Grid from "@mui/material/Grid"
import { TextField, Autocomplete, Button } from "@mui/material"
import DispatchContext from "../../DispatchContext"
//import { Helmet } from "react-helmet"
import dayjs from "dayjs"

function DoneTaskContent() {
  const navigate = useNavigate()
  const [description, setDescription] = useState("")
  const [oldNotes, setOldNotes] = useState()
  const [notes, setNotes] = useState()
  const [creator, setCreator] = useState()
  const [owner, setOwner] = useState()
  const [createDate, setCreateDate] = useState()
  const [plan, setPlan] = useState(null)
  const [plans, setPlans] = useState([])
  const [taskName, setTaskName] = useState()
  const appDispatch = useContext(DispatchContext)
  let { taskId, action } = useParams()
  const state = "done"
  const app = taskId.split("_")[0]

  async function handleSave() {
    try {
      if (!notes) {
        appDispatch({
          type: "toast-failed",
          data: "Notes cannot be empty.",
        })
      } else {
        const response = await Axios.post("/task/edit", {
          description,
          notes,
          taskId,
          state,
        })

        if (response.data) {
          appDispatch({ type: "successMessage", value: "Task updated." })
          navigate(`/kanban/${app}`)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSavePromote() {
    try {
      if (notes) {
        const newState = "closed"
        const response = await Axios.post("/task/editWithState", {
          description,
          notes,
          taskId,
          state,
          newState,
        })
        if (response.data === "Jwt") {
          appDispatch({ type: "errorMessage", value: "Token invalid." })
          appDispatch({ type: "logout" })
          navigate("/")
        } else if (response.data === "Inactive") {
          navigate("/")
          appDispatch({ type: "errorMessage", value: "Inactive." })
        } else {
          appDispatch({
            type: "successMessage",
            value: "Task updated and promoted.",
          })
          navigate(`/kanban/${app}`)
        }
      } else {
        appDispatch({
          type: "errorMessage",
          value: "Enter notes to update task.",
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSaveDemote() {
    try {
      if (notes) {
        const newState = "doing"
        const response = await Axios.post("/task/editWithPlanState", {
          description,
          notes,
          plan,
          taskId,
          state,
          newState,
        })
        if (response.data === "Jwt") {
          appDispatch({ type: "errorMessage", value: "Token invalid." })
          appDispatch({ type: "logout" })
          navigate("/")
        } else if (response.data === "Inactive") {
          navigate("/")
          appDispatch({ type: "errorMessage", value: "Inactive." })
        } else {
          const data = response.data.split(" ")
          data.pop()
          if (data.length > 0) {
            if (data.includes("PlanLength")) {
              appDispatch({
                type: "errorMessage",
                value: "Plan name must be at most 20 characters long.",
              })
            }
            if (data.includes("PlanCharacter")) {
              appDispatch({
                type: "errorMessage",
                value: "Plan name can only contain alphanumeric characters.",
              })
            }
          } else {
            appDispatch({
              type: "successMessage",
              value: "Task updated and demoted.",
            })
            navigate(`/kanban/${app}`)
          }
        }
      } else {
        appDispatch({
          type: "errorMessage",
          value: "Enter notes to update task.",
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleCancel() {
    navigate(`/${taskId}`)
  }

  async function getTaskDetails() {
    try {
      const response = await Axios.post("/task", { taskId })
      const data = response.data
      console.log(data)
      setTaskName(data.Task_name)
      setDescription(data.Task_description)
      setOldNotes(data.Task_notes)
      setPlan(data.Task_plan)
      setCreator(data.Task_creator)
      setCreateDate(data.Task_createDate)
      setOwner(data.Task_owner)
      const name = data.Task_app_Acronym
      try {
        const response = await Axios.post("/plans/list", { name })
        const list = []
        response.data.forEach((plan) => {
          list.push(plan.Plan_MVP_name)
        })
        setPlans(list)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTaskDetails()
  }, [])

  function handlePlanChange(event, values) {
    setPlan(values)
  }

  return (
    <div className="rounded-lg shadow border bg-white border-gray-300 items-center flex w-auto h-auto mx-8 my-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">
          Task #{taskId}: {taskName}
        </h1>
        <div className="flex-col space-y">
          Created by: {creator} <br></br> Created on:{" "}
          {dayjs(createDate).format("DD-MM-YYYY")}
          <br></br>Owner: {owner}
          <br></br> State: {state}
          <div className="mt-4 form-group">
            <label className="text-muted mb-1">
              <h1>Plan Name</h1>
            </label>{" "}
            {action === "demote" ? (
              <Autocomplete
                size="small"
                value={plan}
                options={plans}
                renderInput={(params) => (
                  <TextField {...params} placeholder="No plans" />
                )}
                onChange={handlePlanChange}
              />
            ) : (
              <Autocomplete
                size="small"
                readOnly
                value={plan}
                options={plans}
                renderInput={(params) => (
                  <TextField {...params} placeholder="No plans" />
                )}
              />
            )}
          </div>
          <div className="form-group mt-4">
            <label className="text-muted mb-1">
              <h1>Task Description</h1>
            </label>
            <TextField
              fullWidth
              multiline
              style={{ width: 400 }}
              rows={7}
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="form-group">
          <label className="text-muted mb-1">
            <h1>Task Notes</h1>
          </label>
          <TextField
            multiline
            InputProps={{ readOnly: true }}
            style={{ width: 400 }}
            rows={6}
            defaultValue={oldNotes}
            placeholder="No existing notes"
          />
          <div className="text-muted mt-4">
            <label className="text-muted mb-1">
              <h1>Additional Notes</h1>
            </label>
            <TextField
              style={{ width: 400 }}
              multiline
              rows={6}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter notes"
            />
          </div>
          <div className="flex justify-end">
            {action === "promote" ? (
              <Button onClick={handleSavePromote} color="success">
                Save and Promote
              </Button>
            ) : action === "demote" ? (
              <Button onClick={handleSaveDemote} color="warning">
                Save and Demote
              </Button>
            ) : (
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            )}
            <Button onClick={handleCancel} color="error">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DoneTaskContent
