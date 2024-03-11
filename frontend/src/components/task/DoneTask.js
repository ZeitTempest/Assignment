import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Axios from "axios"
import { TextField, Autocomplete, Button } from "@mui/material"
import dayjs from "dayjs"
import DispatchContext from "../../DispatchContext"

function DoneTask(props) {
  const navigate = useNavigate()
  const [permitted, setPermitted] = useState(false)
  const appDispatch = useContext(DispatchContext)
  let { taskId } = useParams()
  const appName = taskId.split("_")[0]

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  function handleCancel() {
    navigate(`/kanban/${appName}`)
  }

  async function handlePromote() {
    navigate(`/${taskId}/promote`)
  }

  async function handleDemote() {
    navigate(`/${taskId}/demote`)
  }

  async function handleEdit() {
    navigate(`/${taskId}/edit`)
  }

  async function checkDonePermit() {
    try {
      //console.log(app)
      const response = await Axios.post("/app/permit", { appName })
      const groupname = response.data[0].App_permit_Done
      //console.log("group_name:" + groupname)
      if (groupname) {
        try {
          const res = await Axios.post("/verifyAccessGroup", { groupname })
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
    checkDonePermit()
  }, [])

  return (
    <>
      {!permitted ? (
        <div className="rounded-lg shadow border bg-white border-gray-300 items-center flex w-auto h-auto mx-8 my-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">
              Task #{taskId}: {props.taskName}
            </h1>
            <div className="flex-col space-y">
              Created by: {props.creator} <br></br> Created on:{" "}
              {dayjs(props.createDate).format("DD-MM-YYYY")}
              <br></br>Owner: {props.owner}
              <br></br> State: {props.state}
              <div className="mt-4 form-group">
                <label className="text-muted mb-1">
                  <h1>Plan Name</h1>
                </label>{" "}
                <Autocomplete
                  size="small"
                  readOnly
                  value={props.plan}
                  options={props.plans}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="No plans" />
                  )}
                />
              </div>
              <div className="form-group mt-4">
                <label className="text-muted mb-1">
                  <h1>Task Description</h1>
                </label>
                <TextField
                  fullWidth
                  multiline
                  InputProps={{ readOnly: true }}
                  style={{ width: 400 }}
                  rows={7}
                  defaultValue={props.description}
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
                InputProps={{
                  readOnly: true,
                  rows: isFocused ? 12 : 6,
                  transition: "width 0.5s",
                }}
                style={{
                  width: isFocused ? "250%" : 400,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                defaultValue={props.notes}
                placeholder="No existing notes"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCancel} color="error">
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg shadow border bg-white border-gray-300 items-center flex w-auto h-auto mx-8 my-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">
              Task #{taskId}: {props.taskName}
            </h1>
            <div className="flex-col space-y">
              Created by: {props.creator} <br></br> Created on:{" "}
              {dayjs(props.createDate).format("DD-MM-YYYY")}
              <br></br>Owner: {props.owner}
              <br></br> State: {props.state}
              <div className="mt-4 form-group">
                <label className="text-muted mb-1">
                  <h1>Plan Name</h1>
                </label>{" "}
                <Autocomplete
                  size="small"
                  readOnly
                  value={props.plan}
                  options={props.plans}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="No plans" />
                  )}
                />
              </div>
              <div className="form-group mt-4">
                <label className="text-muted mb-1">
                  <h1>Task Description</h1>
                </label>
                <TextField
                  fullWidth
                  multiline
                  InputProps={{ readOnly: true }}
                  style={{ width: 400 }}
                  rows={7}
                  defaultValue={props.description}
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
                InputProps={{
                  readOnly: true,
                  rows: isFocused ? 12 : 6,
                  transition: "width 0.5s",
                }}
                style={{
                  width: isFocused ? "250%" : 400,
                }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                defaultValue={props.notes}
                placeholder="No existing notes"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handlePromote} color="success">
                Promote
              </Button>{" "}
              <Button onClick={handleDemote} color="warning">
                Demote
              </Button>{" "}
              <Button onClick={handleEdit} color="primary">
                Edit
              </Button>{" "}
              <Button onClick={handleCancel} color="error">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DoneTask
