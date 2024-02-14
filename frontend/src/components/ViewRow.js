import { useState } from "react"
import { Switch } from "@mui/material"
import EditRow from "./EditRow"

function ViewRow(props) {
  const [edit, setEdit] = useState(false)
  const isDefaultAdmin = props.username === "admin"

  function handleEdit() {
    setEdit(true)
  }

  return (
    <>
      {edit ? (
        <EditRow username={props.username} email={props.email} isActive={props.isActive} isDefaultAdmin={props.isDefaultAdmin} setEdit={setEdit} />
      ) : (
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4">{props.username}</td>
          <td class="px-6 py-4">••••••••</td>
          <td class="px-6 py-4">{props.email}</td>
          <td class="px-6 py-4">groups</td>
          <td class="px-6 py-4">
            <Switch disabled checked={props.isActive === 1 ? true : false} />
          </td>
          <td>
            <button onClick={handleEdit} className="btn btn-primary btn-sm">
              Edit
            </button>
          </td>
        </tr>
      )}
    </>
  )
}
export default ViewRow
