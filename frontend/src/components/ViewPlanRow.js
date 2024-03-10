import { useState } from "react"
import dayjs from "dayjs"

import EditPlanRow from "./EditPlanRow"

function ViewPlanRow(props) {
  const [edit, setEdit] = useState(false)

  function handleEdit() {
    setEdit(true)
  }

  //prettier-ignore
  return (
    <>
      {edit ? (
        <EditPlanRow 
        name={props.name}
        startDate={props.startDate} 
        endDate={props.endDate} 
        setEdit={setEdit} 
        setRefresh={props.setRefresh} />
      ) : (
        <tr class="border-b bg-gray-800 border-gray-700 font-md text-center">
          <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.name}</td>
          <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.startDate
              ? dayjs(props.startDate).format("DD-MM-YYYY")
              : "-"}</td>
          <td class="px-6 py-4 bg-gray-300 text-gray-800">{props.endDate
              ? dayjs(props.endDate).format("DD-MM-YYYY")
              : "-"}</td>
          <td class="px-6 py-4 bg-gray-300 text-gray-800">
            {props.isPM ? (<button onClick={handleEdit} className="w-1/2 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-blue-800 rounded-lg font-bold text-sm px-5 py-2.5 text-center">
              Edit
            </button>): ("")}
          </td>
        </tr>
      )}
    </>
  )
}
export default ViewPlanRow
