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
      const data = response.data[0]
      setTaskName(data.Task_name)
      setDescription(data.Task_description)
      setOldNotes(data.Task_notes)
      setPlan(data.Task_plan)
      setCreator(data.Task_creator)
      setCreateDate(data.Task_createDate)
      setOwner(data.Task_owner)
      const name = data.Task_app_Acronym
      try {
        const response = await Axios.post("/plan/list", { name })
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
    <>
      <div className="container md-5">
        <Grid container spacing={3} className="mt-1">
          <Grid item xs={6}>
            <h4>
              Task #{taskId}: {taskName}
            </h4>
            Created by: {creator} <br></br> Created on:{" "}
            {dayjs(createDate).format("DD-MM-YYYY")}
            <br></br>Owner: {owner}
            <br></br> State: done
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Plan Name</small>
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
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Task Description</small>
              </label>
              <TextField
                fullWidth
                multiline
                rows={7}
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              ></TextField>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="form-group">
              <label className="text-muted mb-1">
                <small>Task Notes</small>
              </label>
              <>
                <TextField
                  fullWidth
                  multiline
                  InputProps={{ readOnly: true }}
                  rows={6}
                  defaultValue={oldNotes}
                  placeholder="No existing notes"
                ></TextField>
                <label className="text-muted mb-1">
                  <small>Additional Notes</small>
                </label>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes"
                ></TextField>
              </>
            </div>
            <>
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
            </>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default DoneTaskContent
