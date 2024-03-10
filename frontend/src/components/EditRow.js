import { useState, useContext } from "react"
import { Switch } from "@mui/material"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import { Autocomplete, TextField } from "@mui/material"

function EditRow(props) {
  function handleCancel() {
    props.setEdit(false)
  }

  const appDispatch = useContext(DispatchContext)

  const [password, setPassword] = useState("")
  const [email, setEmail] = useState(props.email)
  const [isActive, setIsActive] = useState(props.isActive === 1)
  const [groupsArray, setGroups] = useState(props.userGroups)
  const username = props.username

  function handleGroupChange(event, values) {
    console.log(values)
    setGroups(values)
  }

  function toggleSwitch(event) {
    setIsActive(event.target.checked)
  }
  async function handleSave(e) {
    e.preventDefault()
    //console.log(groupsArray)
    const groups = groupsArray.length > 0 ? groupsArray?.join() : null
    console.log(groups)
    try {
      var response
      //const isActive = checkIsActive ? 1 : 0
      if (password) {
        response = await Axios.post("/admin/updateUser", {
          username,
          password,
          email,
          groups,
          isActive,
        })
      } else {
        response = await Axios.post("/admin/updateUser", {
          username,
          email,
          groups,
          isActive,
        })
      }

      if (response.status === 200) {
        window.location.reload()
        appDispatch({
          type: "toast-success",
          data: "Successfully updated user details.",
        })
      } else {
        //appDispatch({type:"toast-failed", data:"Failed to update user details."})
      }
    } catch (err) {
      //console.log(err)
      appDispatch({ type: "toast-failed", data: err.response.data })

      //IF JWT NO AUTH, LOGOUT
    }
    props.setEdit(false)
    props.setRefresh(true)
  }

  return (
    <>
      <tr class="border-b bg-gray-800 border-gray-700 text-gray-800 whitespace-nowrap font-md text-center">
        <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.username}</td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            class="text-center border border-blue-gray-300  block placeholder-blue-gray-600 focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-200 rounded-lg p-2.5 bg-gray-200"
          />
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={props.email}
            placeholder="new email"
            class="text-center border border-blue-gray-300  block placeholder-blue-gray-600 focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-200 rounded-lg p-2.5 bg-gray-200"
          />
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800 flex justify-center">
          <Autocomplete
            clearIcon={false}
            sx={{ width: "400px" }}
            onChange={handleGroupChange}
            options={props.groupList}
            defaultValue={props.userGroups}
            multiple
            className="border text-white block text-xs rounded-lg bg-blue-gray-50 border-blue-gray-300"
            renderInput={(params) => <TextField {...params} />}
          />
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <Switch checked={isActive} onChange={toggleSwitch} />
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <button
            onClick={handleSave}
            className="w-1/4 mx-2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="w-1/4 mx-2 self-auto text-white bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center"
          >
            Cancel
          </button>
        </td>
      </tr>
    </>
  )
}

export default EditRow
