import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Axios from "axios"
import OpenTask from "./OpenTask"
import TodoTask from "./TodoTask"
import DoingTask from "./DoingTask"
import DoneTask from "./DoneTask"
import ClosedTask from "./ClosedTask"
import DispatchContext from "../../DispatchContext"

function Task() {
  let { taskId } = useParams()
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()
  const [taskName, setTaskName] = useState()
  const [description, setDescription] = useState("")
  const [notes, setNotes] = useState()
  const [plan, setPlan] = useState(null)
  const [plans, setPlans] = useState([])
  const [state, setState] = useState()
  const [creator, setCreator] = useState()
  const [owner, setOwner] = useState()
  const [createDate, setCreateDate] = useState()

  async function getTaskDetails() {
    try {
      const response = await Axios.post("/task", { taskId })
      const data = response.data

      setTaskName(data.Task_name)
      setDescription(data.Task_description)
      setNotes(data.Task_notes)
      setPlan(data.Task_plan)
      setState(data.Task_state)
      setCreator(data.Task_creator)
      setCreateDate(data.Task_createDate)
      setOwner(data.Task_owner)
      const appName = data.Task_app_Acronym

      try {
        const response = await Axios.post("/plans/list", { appName })
        const list = []
        response.data.forEach(plan => {
          list.push(plan.Plan_MVP_name)
        })
        setPlans(list)
      } catch (err) {
        if (err.response.data === "Inactive" || err.response.data === "jwt_error") {
          appDispatch({ type: "logout" })
          navigate("/login")
        }
        console.log(err)
      }
    } catch (err) {
      if (err.response.data === "Inactive" || err.response.data === "jwt_error") {
        appDispatch({ type: "logout" })
        navigate("/login")
      }
      console.log(err)
    }
  }

  useEffect(() => {
    getTaskDetails()
  }, [])

  return (
    <section className="bg-blue-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="container md-5">
            {state === "open" ? <OpenTask description={description} notes={notes} plan={plan} plans={plans} taskName={taskName} creator={creator} createDate={createDate} owner={owner} state={state} /> : ""}
            {state === "todo" ? <TodoTask description={description} notes={notes} plan={plan} plans={plans} taskName={taskName} creator={creator} createDate={createDate} owner={owner} state={state} /> : ""}
            {state === "doing" ? <DoingTask description={description} notes={notes} plan={plan} plans={plans} taskName={taskName} creator={creator} createDate={createDate} owner={owner} state={state} /> : ""}
            {state === "done" ? <DoneTask description={description} notes={notes} plan={plan} plans={plans} taskName={taskName} creator={creator} createDate={createDate} owner={owner} state={state} /> : ""}
            {state === "closed" ? <ClosedTask description={description} notes={notes} plan={plan} plans={plans} taskName={taskName} creator={creator} createDate={createDate} owner={owner} state={state} /> : ""}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Task
