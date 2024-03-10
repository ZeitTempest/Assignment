import { useNavigate } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import { useContext } from "react"

function HeaderLoggedIn() {
  const navigate = useNavigate()

  const appDispatch = useContext(DispatchContext)
  function handleLogout() {
    appDispatch({ type: "logout" })
    navigate("/login")
  }

  function goToDetails() {
    navigate("/details")
  }

  return (
    <div>
      <button
        onClick={goToDetails}
        className="bg-teal-500 hover:bg-teal-700 text-white mx-2 font-bold py-2 px-4 rounded"
      >
        My Details
      </button>
      <button
        onClick={handleLogout}
        className="bg-pink-500 hover:bg-pink-700 text-white mx-2 font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default HeaderLoggedIn
