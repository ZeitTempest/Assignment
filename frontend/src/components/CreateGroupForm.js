import React, { useState, useEffect /*, useContext*/ } from "react"
import Axios from "axios"

const CreateGroupForm = () => {
  const onFinish = async ({ groupName }) => {}

  const onFinishFailed = errorInfo => {
    console.log("failed:", errorInfo)
    //IF JWT NO AUTH, DO LOGOUT
  }

  const [groupname, setnewGroup] = useState("")

  async function handleSubmit(e) {
    e.preventDefault() //prevent default behavior for the event, i.e. a checkbox checking when clicked

    // if (unacceptable username i.e. blank field){
    //give error popup/alert
    // }

    try {
      if (groupname) {
        const response = await Axios.post("/createGroup", { groupname })
        if (response.status === 200) {
          //e.target.reset() //just set back to blank val
          setnewGroup("")
          alert("Group successfully created")
        }
      } else {
        alert("field is blank")
      }
    } catch (e) {
      console.log(e)
      alert("Error creating group")
      //IF JWT NO AUTH, DO LOGOUT
    }
  }
  return (
    <div className="flex items-center justify-center px-6 mx-auto lg:py-0">
      <div className="min-w-full rounded-lg shadow border md:mt-24 mb-2 sm:max-w-screen-lg xl:p-0 bg-blue-gray-800 border-gray-700">
        <form action="#" onSubmit={handleSubmit}>
          <div className="flex space-x-6 sm:p-8 items-center justify-end">
            <div className="flex-col space-y">
              {/* column 1 */}
              <input onChange={e => setnewGroup(e.target.value)} type="username" name="groupname" id="groupname" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 bg-blue-gray-700 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg block w-full p-2.5 bg-gray-700" placeholder="Group Name" required="" />
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
