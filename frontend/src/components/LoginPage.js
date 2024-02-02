import React, { useState /*, useContext*/ } from "react"
import Page from "./Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function LoginPage() {
  const navigate = useNavigate()
  // const unacceptable = [undefined, ""]
  // const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault() //prevent default behavior for the event, i.e. a checkbox checking when clicked

    // if (unacceptable username i.e. blank field){
    //   //give error popup/alert
    // }

    try {
      const response = await Axios.post("/auth/login", { username, password })
      console.log(response.data.replyMsg)

      // if (response.data.result === true) {
      //   //handle login token logic here
      //   navigate("/")
      // } else {
      //   //popup/etc for u/pw error
      // }
    } catch (e) {
      console.log(e)
      //popup/etc for unexpected error
    }
  }

  return (
    <Page title="Home" wide={true}>
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-login" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Enter username" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="password-login" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="py-2 mt-5 btn btn-md btn-success btn-block">
              Log In
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default LoginPage
