import { useNavigate } from "react-router-dom"
import { logoutUser } from "../utils/auth"

function HeaderLoggedIn() {
  const navigate = useNavigate()

  function handleLogout() {
    logoutUser()
    navigate("/login")
  }

  function goToDetails() {
    navigate("/details")
  }

  return (
    <div>
      <button onClick={goToDetails} className="bg-teal-500 hover:bg-teal-700 text-white mx-2 font-bold py-2 px-4 rounded">
        My Details
      </button>
      <button onClick={handleLogout} className="bg-teal-500 hover:bg-teal-700 text-white mx-2 font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  )
}

export default HeaderLoggedIn
