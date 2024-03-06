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
    <Page title="Edit Application">
      <section className="bg-gray-300 flex">
        <div className="items-center flex flex-row basis-1/2 justify-center px-6 py-8 lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-blue-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-teal-100">View Application</h1>
              <div className="flex-col space-y">
                {/*App Description Field*/}
                <input readOnly defaultValue={props.description} name="appDescription" id="appDescription" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg bg-gray-700" placeholder="App Description" />
              </div>
              <div>
                <div>Start Date</div>
                <input type="date" readOnly defaultValue={props.startDate} name="appStartDate" id="appStartDate" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg bg-gray-700" />
                <div>End Date</div>
                <input type="date" readOnly defaultValue={props.endDate} name="appEndDate" id="appEndDate" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg bg-gray-700" />
              </div>
            </div>
          </div>
          <div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex-col space-y">
                {/*Permit Create Field*/}
                <h1>Permit Create</h1>
                <Autocomplete readOnly clearIcon={false} size="small" sx={{ width: "250px" }} value={props.create} options={[]} className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-white" renderInput={params => <TextField label="Permit Create" {...params} />} />
              </div>
              <div className="flex-col space-y">
                {/*Permit Open Field*/}
                <h1>Permit Open</h1>
                <Autocomplete readOnly clearIcon={false} size="small" sx={{ width: "250px" }} value={props.open} options={[]} className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-white" renderInput={params => <TextField label="Permit Open" {...params} />} />
              </div>
              <div className="flex-col space-y">
                {/*Permit Todo Field*/}
                <h1>Permit Todo</h1>
                <Autocomplete readOnly clearIcon={false} size="small" sx={{ width: "250px" }} value={props.todo} options={[]} className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-white" renderInput={params => <TextField label="Permit Todo" {...params} />} />
              </div>{" "}
              <div className="flex-col space-y">
                {/*Permit Doing Field*/}
                <h1>Permit Doing</h1>
                <Autocomplete readOnly clearIcon={false} size="small" sx={{ width: "250px" }} value={props.doing} options={[]} className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-white" renderInput={params => <TextField label="Permit Doing" {...params} />} />
              </div>{" "}
              <div className="flex-col space-y">
                {/*Permit Done Field*/}
                <h1>Permit Done</h1>
                <Autocomplete readOnly clearIcon={false} size="small" sx={{ width: "250px" }} value={props.done} options={[]} className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-white" renderInput={params => <TextField label="Permit Done" {...params} />} />
              </div>
              <button type="submit" onClick={handleCancel} className="w-1/2 mx-2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center ">
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="items-center flex flex-col basis-1/2 justify-center px-6 py-8 md:h-screen lg:py-0"></div>
      </section>
    </Page>
  )
}

export default ViewApp
