import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Axios from "axios"
import { TextField, Autocomplete, Button } from "@mui/material"
import dayjs from "dayjs"
import DispatchContext from "../../DispatchContext"

function DoingTask(props) {
  const navigate = useNavigate()
  const [description, setDescription] = useState(props.description)
  const [notes, setNotes] = useState(props.notes)
  const [permitted, setPermitted] = useState(false)
  const [plan, setPlan] = useState(props.plan)
  const state = props.state
  const appDispatch = useContext(DispatchContext)
  let { taskId } = useParams()
  const appName = taskId.split("_")[0]

  async function handleSave() {
    try {
      if (notes && notes !== props.notes) {
        const response = await Axios.post("/task/edit", {
          description,
          notes,
          taskId,
          state
        })
        if (response.data === "Jwt") {
          appDispatch({ type: "toast-failed", data: "Token invalid." })
          appDispatch({ type: "logout" })
          navigate("/")
        } else if (response.data === "Inactive") {
          navigate("/")
          appDispatch({ type: "toast-failed", data: "Inactive." })
        } else {
          appDispatch({ type: "toast-success", data: "Task updated." })
          navigate(`/kanban/${appName}`)
        }
      } else {
        appDispatch({
          type: "toast-failed",
          data: "Enter notes to update task."
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSavePromote() {
    try {
      if (notes && notes !== props.notes) {
        const newState = "done"
        const response = await Axios.post("/task/promoteDoingTask", {
          description,
          notes,
          taskId,
          state,
          plan,
          newState,
          appName
        })
        if (response.data === "Jwt") {
          appDispatch({ type: "toast-failed", data: "Token invalid." })
          appDispatch({ type: "logout" })
          navigate("/")
        } else if (response.data === "Inactive") {
          navigate("/")
          appDispatch({ type: "toast-failed", data: "Inactive." })
        } else {
          appDispatch({
            type: "toast-success",
            data: "Task updated and promoted."
          })
          navigate(`/kanban/${appName}`)
        }
      } else {
        appDispatch({
          type: "toast-failed",
          data: "Enter notes to update task."
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSaveDemote() {
    try {
      if (notes && notes !== props.notes) {
        const newState = "todo"
        const response = await Axios.post("/task/editWithState", {
          description,
          notes,
          taskId,
          state,
          newState
        })
        if (response.data === "Jwt") {
          appDispatch({ type: "toast-failed", data: "Token invalid." })
          appDispatch({ type: "logout" })
          navigate("/")
        } else if (response.data === "Inactive") {
          navigate("/")
          appDispatch({ type: "toast-failed", data: "Inactive." })
        } else {
          appDispatch({
            type: "toast-success",
            data: "Task updated and demoted."
          })
          navigate(`/kanban/${appName}`)
        }
      } else {
        appDispatch({
          type: "toast-failed",
          data: "Enter notes to update task."
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  function handleCancel() {
    navigate(`/kanban/${appName}`)
  }

  async function checkDoingPermit() {
    try {
      const response = await Axios.post("/app/permit", { appName })
      const groupname = response.data[0].App_permit_Doing
      if (groupname) {
        try {
          const res = await Axios.post("/verifyAccessGroup", {
            groupname
          })
          setPermitted(res.data.userIsInGroup)
        } catch (e) {
          console.log(e)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkDoingPermit()
  }, [])

  return (
    <div className="rounded-lg shadow border bg-white border-gray-300 items-center flex w-auto h-auto mx-8 my-0">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">
          Task #{taskId}: {props.taskName}
        </h1>
        <div className="flex-col space-y">
          Created by: {props.creator} <br></br> Created on: {dayjs(props.createDate).format("DD-MM-YYYY")}
          <br></br>Owner: {props.owner}
          <br></br> State: {props.state}
          <div className="mt-4 form-group">
            <label className="text-muted mb-1">
              <h1>Plan Name</h1>
            </label>{" "}
            <Autocomplete size="small" readOnly value={props.plan} options={props.plans} renderInput={params => <TextField {...params} placeholder="No plans" />} />
          </div>
          <div className="form-group mt-4">
            <label className="text-muted mb-1">
              <h1>Task Description</h1>
            </label>
            {permitted ? <TextField fullWidth multiline style={{ width: 400 }} rows={7} defaultValue={props.description} onChange={e => setDescription(e.target.value)}></TextField> : <TextField fullWidth multiline InputProps={{ readOnly: true }} style={{ width: 400 }} rows={7} defaultValue={props.description}></TextField>}
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="form-group">
          <label className="text-muted mb-1">
            <h1>Task Notes</h1>
          </label>
          {permitted ? (
            <>
              <TextField multiline InputProps={{ readOnly: true }} style={{ width: 400 }} rows={6} defaultValue={props.notes} placeholder="No existing notes" />
              <div className="text-muted mt-4">
                <label className="text-muted mb-1">
                  <h1>Additional Notes</h1>
                </label>
                <TextField style={{ width: 400 }} multiline rows={6} onChange={e => setNotes(e.target.value)} placeholder="Enter notes"></TextField>
              </div>
            </>
          ) : (
            <TextField multiline InputProps={{ readOnly: true }} style={{ width: 400 }} rows={6} defaultValue={props.notes}></TextField>
          )}
        </div>
        <div className="flex justify-end">
          {permitted ? (
            <>
              <Button onClick={handleSavePromote} color="success">
                Save and Promote
              </Button>
              <Button onClick={handleSaveDemote} color="warning">
                Save and Demote
              </Button>
              <Button onClick={handleSave} color="primary">
                Save
              </Button>
            </>
          ) : (
            ""
          )}
          <Button onClick={handleCancel} color="error">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DoingTask
