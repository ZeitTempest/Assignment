import React, { useState, useEffect /*, useContext*/ } from "react"
import Page from "../components/Page"
import Axios from "axios"
import dayjs from "dayjs"
import { useNavigate, useParams } from "react-router-dom"
import { Autocomplete, TextField, useThemeProps } from "@mui/material"
import { useContext } from "react"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import ViewApp from "./ViewApp"

function CreateApp() {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const [isPL, setIsPL] = useState(false)
  const appDispatch = useContext(DispatchContext)
  const [appName, setAppName] = useState()
  const [description, setDescription] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [create, setCreate] = useState(null)
  const [open, setOpen] = useState(null)
  const [todo, setTodo] = useState(null)
  const [doing, setDoing] = useState(null)
  const [done, setDone] = useState(null)
  const [groupList, setGroupList] = useState([])

  async function checkPL() {
    try {
      const groupname = "project-lead"
      const response = await Axios.post("/verifyAccessGroup", { groupname })
      setIsPL(response.data.userIsInGroup)
    } catch (err) {
      console.log(err)
    }
  }

  async function getGroupList() {
    setGroupList([])
    try {
      const response = await Axios.get("/allGroups")
      const data = response.data
      //console.log(data)
      if (data) {
        const options = []
        response.data.forEach(group => {
          options.push(group.groupname)
        })
        setGroupList(options)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!appState.loggedIn) {
      appDispatch({ type: "logout" })
      appDispatch({ type: "toast-failed", data: "Please log in." })
      navigate("/")
    } else {
      checkPL()
      getGroupList()
    }
  }, [])

  function handleOpenChange(event, values) {
    setOpen(values)
  }

  function handleTodoChange(event, values) {
    setTodo(values)
  }

  function handleDoingChange(event, values) {
    setDoing(values)
  }

  function handleDoneChange(event, values) {
    setDone(values)
  }

  function handleCreateChange(event, values) {
    setCreate(values)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!appName) {
      console.log("1")
      appDispatch({ type: "toast-failed", data: "App Acronym cannot be empty." })
      return
    }
    if (!startDate) {
      console.log("2")
      appDispatch({ type: "toast-failed", data: "Start date cannot be empty." })
      return
    }
    if (!endDate) {
      console.log("3")
      appDispatch({ type: "toast-failed", data: "End date cannot be empty.." })
      return
    }

    try {
      const response = await Axios.post("/app/create", { appName, description, startDate, endDate, create, open, todo, doing, done })
      if (response.status !== 200) {
        appDispatch({ type: "toast-failed", data: response.data })
      }
      appDispatch({ type: "toast-success", data: response.data })
      navigate("/home")
    } catch (err) {
      console.log(err)
      appDispatch({ type: "toast-failed", data: err.response.data })
    }
  }

  function handleCancel() {
    navigate("/home")
  }

  return (
    <Page title="Create Application">
      {isPL ? (
        <section className="bg-blue-gray-100 flex justify-center items-center h-screen w-screen">
          <div className="rounded-lg shadow border bg-white border-gray-300 items-center flex w-auto h-auto">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">Create Application</h1>
              <div className="flex-col space-y">
                <div>App Acronym</div>
                <input onChange={e => setAppName(e.target.value)} defaultValue={appName} name="appAcronym" id="appAcronym" className="text-white sm:text-sm rounded-lg block h-auto bg-blue-gray-500 p-2.5 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="App Acronym" />

                {/*App Description Field*/}
                <div>App Description</div>
                <TextField style={{ width: 400 }} multiline rows={8} defaultValue={description} onChange={e => setDescription(e.target.value)}></TextField>
                {/* <input onChange={e => setDescription(e.target.value)} defaultValue={description} name="appDescription" id="appDescription" className="text-white sm:text-sm rounded-lg block h-auto p-20 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="App Description" /> */}
              </div>
              <div>
                <div>Start Date</div>
                <input type="date" onChange={e => setStartDate(e.target.value)} defaultValue={startDate} name="appStartDate" id="appStartDate" className="border text-white sm:text-sm rounded-lg block w-3/5 p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" />
                <div>End Date</div>
                <input type="date" onChange={e => setEndDate(e.target.value)} defaultValue={endDate} name="appEndDate" id="appEndDate" className="border text-white sm:text-sm rounded-lg block w-3/5 p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex-col space-y">
                {/*Permit Create Field*/}
                <h1>Permit Create</h1>
                <Autocomplete clearIcon={false} size="small" sx={{ width: "250px" }} onChange={handleCreateChange} value={create} options={groupList} className="50 border block border-blue-gray-300 text-xs rounded-lg bg-white" renderInput={params => <TextField {...params} />} />
              </div>
              <div className="flex-col space-y">
                {/*Permit Open Field*/}
                <h1>Permit Open</h1>
                <Autocomplete clearIcon={false} size="small" sx={{ width: "250px" }} onChange={handleOpenChange} value={open} options={groupList} className="50 border block border-blue-gray-300 text-xs rounded-lg bg-white" renderInput={params => <TextField {...params} />} />
              </div>
              <div className="flex-col space-y">
                {/*Permit Todo Field*/}
                <h1>Permit Todo</h1>
                <Autocomplete clearIcon={false} size="small" sx={{ width: "250px" }} onChange={handleTodoChange} value={todo} options={groupList} className="50 border block border-blue-gray-300 text-xs rounded-lg bg-white" renderInput={params => <TextField {...params} />} />
              </div>{" "}
              <div className="flex-col space-y">
                {/*Permit Doing Field*/}
                <h1>Permit Doing</h1>
                <Autocomplete clearIcon={false} size="small" sx={{ width: "250px" }} onChange={handleDoingChange} value={doing} options={groupList} className="50 border block border-blue-gray-300 text-xs rounded-lg bg-white" renderInput={params => <TextField {...params} />} />
              </div>{" "}
              <div className="flex-col space-y">
                {/*Permit Done Field*/}
                <h1>Permit Done</h1>
                <Autocomplete clearIcon={false} size="small" sx={{ width: "250px" }} onChange={handleDoneChange} value={done} options={groupList} className="50 border block border-blue-gray-300 text-xs rounded-lg bg-white" renderInput={params => <TextField {...params} />} />
              </div>
              <button type="submit" onClick={handleCancel} className="w-2/5 mr-6 self-auto text-white bg-pink-500 hover:bg-pink-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center ">
                Cancel
              </button>
              <button type="submit" onClick={handleSubmit} className="w-2/5 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 text-center ">
                Save
              </button>
            </div>
          </div>
        </section>
      ) : (
        <ViewApp description={description} startDate={startDate} endDate={endDate} create={create} open={open} todo={todo} doing={doing} done={done} />
      )}
    </Page>
  )
}

export default CreateApp
