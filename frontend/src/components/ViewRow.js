import { useState } from "react"
import { Switch } from "@mui/material"
import EditRow from "./EditRow"
import { Autocomplete, TextField } from "@mui/material"

function ViewRow(props) {
  const [edit, setEdit] = useState(false)
  const isDefaultAdmin = props.username === "admin"

  function handleEdit() {
    setEdit(true)
  }

  return (
    <>
      {edit ? (
        <EditRow username={props.username} email={props.email} userGroups={props.userGroups} groupList={props.groupList} isActive={props.isActive} isDefaultAdmin={props.isDefaultAdmin} setEdit={setEdit} />
      ) : (
        <tr class="bg-white border-b bg-gray-800 border-gray-700 font-md text-center">
          <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.username}</td>
          <td class="px-6 py-4 bg-gray-600 text-white">••••••••</td>
          <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.email}</td>
          <td class="px-6 py-4 bg-gray-600 text-white">
            <Autocomplete clearIcon={false} sx={{ width: "250px" }} options={props.groupList} readOnly defaultValue={props.userGroups} multiple className="bg-blue-gray-50 border border-blue-gray-300 block border-blue-gray-100 text-xs rounded-lg bg-gray-700" renderInput={params => <TextField {...params} />} />
          </td>
          <td class="px-6 py-4 bg-gray-300 text-gray-800">
            <Switch disabled checked={props.isActive === 1 ? true : false} />
          </td>
          <td>
            <button onClick={handleEdit} className="w-1/2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center">
              Edit
            </button>
          </td>
        </tr>
      )}
    </>
  )
}
export default ViewRow