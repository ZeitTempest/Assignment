import { useState } from "react"
import { Switch } from "@mui/material"
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
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <td class="px-6 py-4">{props.username}</td>
        <td class="px-6 py-4">
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder="password" />
        </td>
        <td class="px-6 py-4">
          <input type="email" onChange={e => setEmail(e.target.value)} defaultValue={props.email} placeholder="new email" />
        </td>
        <td class="px-6 py-4">groups</td>
        <td class="px-6 py-4">
          <Switch checked={props.isActive === 1 ? true : false} />
        </td>
        <td>
          <button onClick={handleSave} className="btn btn-primary btn-sm">
            Save
          </button>
          <button onClick={handleCancel} className="btn btn-primary btn-sm">
            Cancel
          </button>
        </td>
      </tr>
    </>
  )
}

export default EditRow
