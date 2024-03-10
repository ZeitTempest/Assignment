import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import DispatchContext from "../DispatchContext"

function EditPlanRow(props) {
  const [startDate, setStartDate] = useState(props.startDate)
  const [endDate, setEndDate] = useState(props.endDate)
  const appDispatch = useContext(DispatchContext)
  let { appName } = useParams()
  const planName = props.name

  async function handleSave(e) {
    e.preventDefault()
    try {
      await Axios.post("/plans/edit", {
        appName,
        startDate,
        endDate,
        planName,
      })
      appDispatch({
        type: "toast-success",
        data: "Successfully updated plan.",
      })
    } catch (err) {
      appDispatch({
        type: "toast-failed",
        data: err.response.data,
      })
      console.log(err)
    }
    props.setEdit(false)
    props.setRefresh(true)
  }

  function handleCancel() {
    props.setEdit(false)
  }

  return (
    <>
      <tr class="border-b bg-gray-800 border-gray-700 font-md text-center">
        <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.name}</td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <input
            type="date"
            defaultValue={props.startDate}
            onChange={(newValue) => {
              setStartDate(newValue.target.value)
            }}
          />
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <input
            type="date"
            defaultValue={props.endDate}
            onChange={(newValue) => {
              setEndDate(newValue.target.value)
            }}
          />
        </td>
        <td class="px-6 py-4 bg-gray-300 text-gray-800">
          <button
            onClick={handleSave}
            className="w-1/3 mx-2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="w-1/3 mx-2 self-auto text-white  bg-pink-500 hover:bg-pink-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center"
          >
            Cancel
          </button>
        </td>
      </tr>
    </>
  )
}
export default EditPlanRow
