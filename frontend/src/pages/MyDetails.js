import React, { useState, useEffect /*, useContext*/ } from "react"
import Page from "../components/Page"
import { logoutUser } from "../utils/auth"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function MyDetails() {
  const navigate = useNavigate()
  // const unacceptable = [undefined, ""]
  // const appDispatch = useContext(DispatchContext)
  const [currUsername, setcurrUsername] = useState("")
  const [currEmail, setcurrEmail] = useState("")

  useEffect(() => {
    const init = async () => {
      const res = await Axios.get("/getUser")
      setcurrUsername(res.data.username)
      setcurrEmail(res.data.email)
    }

    init()
  }, [])

  const [email, setnewEmail] = useState("")
  const [password, setnewPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault() //prevent default behavior for the event, i.e. a checkbox checking when clicked

    // if (unacceptable username i.e. blank field){
    //give error popup/alert
    // }

    var response

    try {
      response = await Axios.post("/updateUser", { email, password })

      if (response.data.result === true) {
        if (email || password) alert("Successfully updated your details.")
        e.target.reset()
      }
      // else {
      //popup/etc for u/pw error
      // }
    } catch (e) {
      console.log(e)
      alert("invalid email or password field")
      if (e.code >= 400) {
        logoutUser()
        navigate("logout")
      }
    }
  }

  return (
    <Page title="My Details">
      <section className="bg-gray-300 flex">
        <div className="items-center flex flex-col basis-1/2 justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-blue-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-teal-100">My Details</h1>
              <div>
                <label className="block mb-2 text-lg font-medium text-blue-100">Username</label>
                <label className="block mb-2 text-lg font-thin text-white">{`${currUsername}`}</label>
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-blue-100">Email</label>
                <label className="block mb-2 text-lg font-thin text-white">{`${currEmail}`}</label>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center flex flex-col basis-1/2 justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-blue-gray-800 border-gray-700">
            <div className="justify-self-center p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-teal-100">Edit Details</h1>
              <form action="#" onSubmit={handleSubmit}>
                <div>
                  <label className="block my-2 text-lg font-medium text-blue-100">Change My Email</label>
                  <input onChange={e => setnewEmail(e.target.value)} type="username" name="username" id="username" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 bg-blue-gray-700 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 sm:text-sm rounded-lg block w-full p-2.5" placeholder="New Email" required="" />
                </div>
                <div>
                  <label className="block my-2 text-lg font-medium text-blue-100">Change My Password</label>
                  <input onChange={e => setnewPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 bg-blue-gray-700 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 sm:text-sm rounded-lg block w-full p-2.5 text-white" required="" />
                </div>
                <button type="submit" className="w-1/2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 my-2 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-md px-5 py-2.5 text-center ">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
export default MyDetails
