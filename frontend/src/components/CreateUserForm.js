import axios from "axios"
import { Autocomplete, Chip, TextField } from "@mui/material"
import React, { useState } from "react"

const CreateUserForm = props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [groups, setGroups] = useState([])

  async function handleCreateUser(e) {
    e.preventDefault()
    try {
      if (username && password) {
        const res = await axios.post("/createUser", { username, password, email, groups })
        if (res.data) {
          //e.target.reset()
          setUsername("")
          setPassword("")
          setEmail("")
          setGroups([])
          alert("User successfully created")
        }
      } else {
        alert("Username and password are mandatory!")
        //error Username and password mandatory!
      }
    } catch (err) {
      console.log(err)
      alert("1 or more fields is invalid")
    }
  }

  function handleGroupChange(event, values) {
    setGroups(values)
  }

  return (
    <div className="flex justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="min-w-full rounded-lg shadow border md:my-2 sm:max-w-screen-lg xl:p-0 bg-blue-gray-800 border-gray-700">
        <div className="flex space-x-6 sm:p-8 items-center justify-end">
          <div className="flex-col space-y">
            {/*Username Field*/}
            <input type="username" onChange={e => setUsername(e.target.value)} name="username" id="username" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg bg-gray-700" placeholder="Username" required="" />
          </div>
          <div className="flex-col space-y">
            {/*Password Field*/}
            <input type="password" onChange={e => setPassword(e.target.value)} name="password" id="password" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg bg-gray-700" placeholder="Password" required="" />
          </div>
          <div className="flex-col space-y">
            {/*Email Field*/}
            <input type="email" onChange={e => setEmail(e.target.value)} name="email" id="email" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg bg-gray-700" placeholder="Email" required="" />
          </div>
          <div className="flex-col space-y">
            {/*Add Groups Field*/}
            {/* <input type="addGroups" name="addGroups" id="addGroups" className="bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block w-full p-2.5 bg-blue-gray-700 border-blue-gray-100 placeholder-blue-gray-200 focus:border-blue-600 focus:bg-blue-gray-600 text-xs rounded-lg block w-full p-2.5 bg-gray-700" placeholder="Add Groups" required="" /> */}
            <Autocomplete clearIcon={false} onChange={handleGroupChange} sx={{ width: "250px" }} options={props.groupList} multiple className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-gray-700" renderInput={params => <TextField label="Select Groups.." {...params} />} />
          </div>
          <div>
            {/* Submit Button */}
            <button type="submit" onClick={handleCreateUser} className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center">
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUserForm
