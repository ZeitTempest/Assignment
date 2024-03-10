import React, { useState, useEffect /*, useContext*/ } from "react"
import Page from "../components/Page"
import Axios from "axios"
import dayjs from "dayjs"
import { useNavigate, useParams } from "react-router-dom"
import { Autocomplete, TextField, useThemeProps } from "@mui/material"
import { useContext } from "react"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"

function ViewApp(props) {
  const appState = useContext(StateContext)
  const navigate = useNavigate()
  const appDispatch = useContext(DispatchContext)
  let { appName } = useParams()

  useEffect(() => {
    if (!appState.loggedIn) {
      appDispatch({ type: "logout" })
      appDispatch({ type: "toast-failed", value: "Please log in." })
      navigate("/")
    }
  }, [])

  function handleCancel() {
    navigate("/home")
  }

  return (
    <Page title="View Application">
      <section className="bg-blue-gray-100 flex justify-center items-center h-screen w-screen">
        <div className="rounded-lg shadow border bg-white border-gray-300 items-center flex w-auto h-auto mx-8 my-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-blue-900">
              {appName}
            </h1>
            <div className="flex-col space-y">
              {/*App Description Field*/}
              <div>App Description</div>
              <TextField
                style={{ width: 400 }}
                readOnly
                multiline
                rows={8}
                value={props.description}
              ></TextField>
              {/* <input readOnly defaultValue={props.description} name="appDescription" id="appDescription" className="border text-white sm:text-sm rounded-lg block h-auto p-20 bg-blue-gray-500 border-blue-gray-300 placeholder-blue-gray-200 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="App Description" /> */}
            </div>
            <div>
              <div>Start Date</div>
              <input
                type="date"
                readOnly
                defaultValue={props.startDate}
                name="appStartDate"
                id="appStartDate"
                className="border text-white sm:text-sm rounded-lg block w-3/5 p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-blue-gray-200 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500"
              />
              <div>End Date</div>
              <input
                type="date"
                readOnly
                defaultValue={props.endDate}
                name="appEndDate"
                id="appEndDate"
                className="border text-white sm:text-sm rounded-lg block w-3/5  p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-blue-gray-200 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex-col space-y">
              {/*Permit Create Field*/}
              <h1>Permit Create</h1>
              <Autocomplete
                readOnly
                clearIcon={false}
                size="small"
                sx={{ width: "250px" }}
                value={props.create}
                options={[]}
                className="border block border-blue-gray-300 text-xs rounded-lg bg-white"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="flex-col space-y">
              {/*Permit Open Field*/}
              <h1>Permit Open</h1>
              <Autocomplete
                readOnly
                clearIcon={false}
                size="small"
                sx={{ width: "250px" }}
                value={props.open}
                options={[]}
                className="border block border-blue-gray-300 text-xs rounded-lg bg-white"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className="flex-col space-y">
              {/*Permit Todo Field*/}
              <h1>Permit Todo</h1>
              <Autocomplete
                readOnly
                clearIcon={false}
                size="small"
                sx={{ width: "250px" }}
                value={props.todo}
                options={[]}
                className="border block border-blue-gray-300 text-xs rounded-lg bg-white"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>{" "}
            <div className="flex-col space-y">
              {/*Permit Doing Field*/}
              <h1>Permit Doing</h1>
              <Autocomplete
                readOnly
                clearIcon={false}
                size="small"
                sx={{ width: "250px" }}
                value={props.doing}
                options={[]}
                className="border block border-blue-gray-300 text-xs rounded-lg bg-white"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>{" "}
            <div className="flex-col space-y">
              {/*Permit Done Field*/}
              <h1>Permit Done</h1>
              <Autocomplete
                readOnly
                clearIcon={false}
                size="small"
                sx={{ width: "250px" }}
                value={props.done}
                options={[]}
                className="border block border-blue-gray-300 text-xs rounded-lg bg-white"
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <button
              type="submit"
              onClick={handleCancel}
              className="w-1/2 mx-2 self-auto text-white bg-pink-500 hover:bg-pink-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center "
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default ViewApp
