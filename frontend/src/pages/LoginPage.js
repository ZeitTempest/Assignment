import React, { useState /*, useContext*/ } from "react"
import Page from "../components/Page"

import Axios from "axios"
import Cookies from "js-cookie"
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
    //give error popup/alert
    // }

    try {
      const response = await Axios.post("/auth/login", { username, password })
      if (response.data.result === true) {
        navigate("/")
      } else {
        //popup/etc for u/pw error
      }
    } catch (e) {
      //console.log(e)
      //popup/etc for unexpected error
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-600">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input onChange={e => setUsername(e.target.value)} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required="" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>
              <div className="flex items-center justify-between"></div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
