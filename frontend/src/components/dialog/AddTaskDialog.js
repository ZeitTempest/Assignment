import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { TextField, Autocomplete, Button } from "@mui/material"
import Axios from "axios"
import dayjs from "dayjs"
import DispatchContext from "../../DispatchContext"

function AddTaskDialog(props) {
  const [taskName, setTaskName] = useState()
  const [description, setDescription] = useState()
  const [plan, setPlan] = useState("")
  const [notes, setNotes] = useState()
  const appDispatch = useContext(DispatchContext)

  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  let { appName } = useParams()

  function handlePlanChange(event, values) {
    setPlan(values)
  }

  async function handleSaveTask() {
    if (!taskName) {
      appDispatch({ type: "toast-failed", data: "Task name required." })
    }

    //console.log(taskName)
    else
      try {
        const createDate = dayjs().format("YYYY-MM-DD")
        const response = await Axios.post("/task/create", {
          taskName,
          description,
          notes,
          plan,
          appName,
          createDate,
        })

        appDispatch({
          type: "toast-success",
          data: "Task successfully created.",
        })
        props.setOpenAddTask(false)
        window.location.reload()
      } catch (err) {
        appDispatch({
          type: "toast-failed",
          data: err.response.data,
        })
      }
  }

  function handleCancelTask() {
    props.setOpenAddTask(false)
    window.location.reload()
  }

  return (
    <div className="flex space-x-4 px-8 pb-8  w-auto justify-self-center">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">
          Create Task for {appName}
        </h1>
        <div className="flex-col space-y">
          <div>Task Name</div>
          <input
            type="name"
            name="taskName"
            id="taskName"
            className="border text-white sm:text-sm rounded-lg block w-full p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Task Name"
            required=""
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="pt-4">Task Description</div>
          <TextField
            style={{ width: 400 }}
            readOnly
            multiline
            rows={8}
            value={props.description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <div className="flex-col space-y">
          <div>Plan Name</div>
          <Autocomplete
            size="small"
            options={props.plans}
            renderInput={(params) => (
              <TextField {...params} placeholder="Plans" />
            )}
            onChange={handlePlanChange}
          />
          <div className="pt-4">Task Notes</div>
          <TextField
            style={{
              width: isFocused ? "300%" : 400,
              transition: "width 0.5s",
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            rows={isFocused ? 12 : 6}
            readOnly
            multiline
            value={props.description}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={handleCancelTask}
          className="w-2/5 mr-6 self-auto text-white bg-pink-500 hover:bg-pink-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center "
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSaveTask}
          className="w-2/5 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center "
        >
          Save
        </button>
      </div>
    </div>
  )
}
export default AddTaskDialog
