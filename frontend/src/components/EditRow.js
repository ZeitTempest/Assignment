import { useState } from "react"
import { Switch, TableCell } from "@mui/material"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function EditRow(props) {
  function handleCancel() {
    props.setEdit(false)
  }

  const appDispatch = useState(DispatchContext)
  const [password, setPassword] = useState()
  const [email, setEmail] = useState(props.email)
  const [isActive, setIsActive] = useState(props.isActive)
  const [groups, setGroups] = useState()
  const username = props.username

  async function handleSave() {
    try {
      var response
      if (password) {
        response = await Axios.post("/admin/updateUser", { username, password, email, isActive })
      } else {
        response = await Axios.post("/admin/updateUser", { username, email, isActive })
      }

      if (response.data.result === true) {
      } else {
        //popup/etc for u/pw error
      }
    } catch (e) {
      //console.log(e)
      //popup/etc for unexpected error
      //IF JWT NO AUTH, DO LOGOUT
    }
    props.setEdit(false)
  }

  return (
    <>
      <tr class="bg-white border-b bg-gray-800 border-gray-700 text-gray-800 whitespace-nowrap font-md text-center">
        <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.username}</td>
        <td class="px-6 py-4 bg-gray-600 text-white">
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder="New password" class="text-center bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block border-blue-gray-100 placeholder-blue-gray-200 text-white focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-600 rounded-lg block p-2.5 bg-gray-700"/>
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <input type="email" onChange={e => setEmail(e.target.value)} defaultValue={props.email} placeholder="new email" class="text-center bg-blue-gray-50 border border-blue-gray-300 text-white focus:ring-blue-600 block border-blue-gray-100 placeholder-blue-gray-300 text-gray-800 focus:ring-blue-500 focus:border-blue-600 focus:bg-blue-gray-200 rounded-lg block p-2.5 bg-gray-200"/>
        </td>
        <td class="px-6 py-4 bg-gray-600 text-white">groups</td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <Switch checked={props.isActive === 1 ? true : false} onChange={props.setIsActive === !props.isActive}/>
        </td>
        <td>
          <button onClick={handleSave} className="w-1/4 mx-2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center">
            Save
          </button>
          <button onClick={handleCancel} className="w-1/4 mx-2 self-auto text-white bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center">
            Cancel
          </button>
        </td>
      </tr>
    </>
  )
}

export default EditRow
