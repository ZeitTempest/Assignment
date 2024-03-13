import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import DispatchContext from "../../DispatchContext"
import Axios from "axios"
import ViewPlanRow from "../../components/ViewPlanRow"
import dayjs from "dayjs"
import axios from "axios"

function PlanDialog() {
  const [planName, setPlanName] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [plans, setPlans] = useState([])
  const [isPM, setIsPM] = useState(false)
  const [refresh, setRefresh] = useState(false)
  let { appName } = useParams()

  async function handleCreate(e) {
    e.preventDefault()
    if (planName) {
      if (!startDate || !setEndDate) {
        return appDispatch({
          type: "toast-failed",
          data: "Start and end dates required."
        })
      }
      if (startDate && endDate) {
        try {
          await Axios.post("/plans/create", {
            planName,
            startDate,
            endDate,
            appName
          })

          appDispatch({
            type: "toast-success",
            data: "Successfully created plan."
          })
        } catch (err) {
          if (err.response.data === "Inactive" || err.response.data === "jwt_error") {
            appDispatch({ type: "logout" })
            navigate("/login")
          } else appDispatch({ type: "toast-failed", data: err.response.data })
        }
      }
    } else appDispatch({ type: "toast-failed", data: "Plan Name required." })
  }

  async function getPlanTable() {
    setPlans([])
    try {
      const response = await Axios.post("/plans", { appName })
      setPlans(response.data)
    } catch (err) {
      if (err.response.data === "Inactive" || err.response.data === "jwt_error") {
        appDispatch({ type: "logout" })
        navigate("/login")
      }
      console.log(err)
    }
  }

  async function checkPM() {
    try {
      const groupname = "project-manager"
      const response = await Axios.post("/verifyAccessGroup", { groupname })
      setIsPM(response.data.userIsInGroup)
    } catch (err) {
      if (err.response.data === "Inactive" || err.response.data === "jwt_error") {
        appDispatch({ type: "logout" })
        navigate("/login")
      }
      console.log(err)
    }
  }

  useEffect(() => {
    getPlanTable()
    checkPM()
    setRefresh(false)
  }, [refresh])

  //prettier-ignore
  return (
    <>
      <div className="flex space-x-4 px-8 pb-8">
        <div className="flex-col w-full justify-center items-center space-y">
          {isPM ? (
            <div>
              <div className="flex space-x-6 sm:p-8 items-center justify-end">
                <div className="flex-col space-y">
                  <input 
                  type="name" 
                  onChange={e => setPlanName(e.target.value)} 
                  name="planName" 
                  id="planName" 
                  className="border text-white sm:text-sm rounded-lg block w-full p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Plan Name" 
                  required="" />
                </div>
                <div className="flex-col space-y">
                  <input 
                  type="date" 
                  onChange={e => setStartDate(e.target.value)} 
                  name="startDate" 
                  id="startDate" 
                  className="border text-white sm:text-sm rounded-lg block w-full p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Start Date" 
                  required="" />
                </div>
                <div className="flex-col space-y">
                  <input 
                  type="date" 
                  onChange={e => setEndDate(e.target.value)} 
                  name="endDate" 
                  id="endDate" 
                  className="border text-white sm:text-sm rounded-lg block w-full p-2.5 bg-blue-gray-500 border-blue-gray-300 placeholder-gray-100 focus:bg-blue-gray-400 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="End Date" 
                  required="" />
                </div>
                <div>
                  <button type="submit" onClick={handleCreate} className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center">
                    Create Plan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-400">
              <thead class="text-xs text-gray-100 uppercase bg-gray-700 text-center">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Plan Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" class="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
              {plans.map((plan) => {
                  return <ViewPlanRow 
                  name={plan.Plan_MVP_name}
                  startDate={plan.Plan_startDate ? 
                    dayjs(plan.Plan_startDate).format("YYYY-MM-DD") : null} 
                  endDate={plan.Plan_endDate ?
                    dayjs(plan.Plan_endDate).format("YYYY-MM-DD") : null} 
                    isPM={isPM}
                    setRefresh={setRefresh} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
export default PlanDialog
