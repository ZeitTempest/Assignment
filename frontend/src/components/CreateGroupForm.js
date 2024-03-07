import React, { useState, useEffect /*, useContext*/ } from "react"
import Axios from "axios"

import { useContext } from "react"
import DispatchContext from "../DispatchContext"

const CreateGroupForm = () => {
  const appDispatch = useContext(DispatchContext)

  const onFinish = async ({ groupname }) => {}

  const onFinishFailed = errorInfo => {
    console.log("create group failed:", errorInfo)
  }

  const [groupname, setnewGroup] = useState("")

  async function handleSubmit(e) {
    e.preventDefault() //prevent default behavior for the event, i.e. a checkbox checking when clicked

    try {
      if (groupname) {
        await Axios.post("/createGroup", { groupname })
        setnewGroup("")
        window.location.reload()
        appDispatch({
          type: "toast-success",
          data: "Group successfully created."
        })
      } else {
        appDispatch({ type: "toast-failed", data: "Field cannot be blank." })
      }
    } catch (err) {
      appDispatch({ type: "toast-failed", data: err.response.data })
    }
  }
  return (
    <div className="flex items-center justify-center px-6 mx-auto lg:py-0">
      <div className="min-w-full rounded-lg shadow border md:mt-24 mb-2 sm:max-w-screen-lg xl:p-0 bg-white border-gray-300">
        <form action="#" onSubmit={handleSubmit}>
          <div className="flex space-x-6 sm:p-8 items-center justify-end">
            <div className="flex-col space-y">
              {/* column 1 */}
              <input onChange={e => setnewGroup(e.target.value)} type="username" name="groupname" id="groupname" className="border text-white sm:text-sm rounded-lg block w-full p-2.5 bg-blue-gray-500 border-blue-gray-100 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="Group Name" required="" />
            </div>
            <div>
              {/* column 2 */}
              <button type="submit" className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center">
                Create Group
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGroupForm
