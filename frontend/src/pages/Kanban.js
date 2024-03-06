import React, { useState, useContext, useEffect } from "react"
import Page from "../components/Page"
import DispatchContext from "../DispatchContext"

import { logoutUser } from "../utils/auth"
import Axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function Kanban() {
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    //console.log(Cookies.get('jwt')) //jwt check
  }, [])

  const navigate = useNavigate()
  // const unacceptable = [undefined, ""]
  // const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault() //prevent default behavior for the event, i.e. a checkbox checking when clicked

    // if (unacceptable username i.e. blank field){
    //give error popup/alert
    // }
    if (!username || !password) {
      appDispatch({ type: "toast-failed", data: "Fields cannot be empty." })
    } else
      try {
        const response = await Axios.post("/auth/login", { username, password })

        appDispatch({ type: "login", data: response.data })
        appDispatch({ type: "toast-success", data: "Successful login." })
        Cookies.set("jwt", response.data.jwt)
        navigate("/")
      } catch (err) {
        appDispatch({ type: "toast-failed", data: "Unsuccessful login." })
        return
      }
    //popup/etc for unexpected error
  }

  return (
    <div className="bg-blue-gray-100 flex justify-center items-center h-screen w-screen px-6 mx-auto lg:py-0">
      <div className="justify-center items-center rounded-lg sm:max-w-lg xl:p-0 shadow border bg-white border-gray-300 flex w-screen h-3/5">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="text-xl font-bold leading-tight tracking-tight text-center md:text-2xl text-blue-900">
            App
          </div>
        </div>
      </div>
    </div>
  )
}
export default Kanban
