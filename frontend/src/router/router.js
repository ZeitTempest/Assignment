import "../App.css"
import { React, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
import { isLoggedIn } from "../utils/auth"
import Header from "../components/Header"
import Cookie from "js-cookie"

//My Components
import LoginPage from "../pages/LoginPage"
import TMSPage from "../pages/TMSPage"
import MyDetails from "../pages/MyDetails"
import UserManagementPage from "../pages/UserManagementPage"
import EditApp from "../pages/EditApp"
import Kanban from "../pages/Kanban"

export default function BrowserRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="" element={<TMSPage />} /> {/* root redirect to login or tms */}
          <Route path="/home" element={<TMSPage />} />
        </Route>

        {/**non auth route: redirect to login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/details" element={<MyDetails />} />
        <Route path="/management" element={<UserManagementPage />} />
        <Route path="/editApp/:appName" element={<EditApp />} />
        <Route path="/:appName" element={<Kanban />} />
      </Routes>
    </BrowserRouter>
  )
}

const PrivateRoute = () => {
  const [loginState, setisLoggedIn] = useState(Cookie.get("jwt"))
  useEffect(() => {
    console.log(<Outlet />)
    // setisLoggedIn(Cookie.get("jwt"))
    //gets called on first render and state change/re-render
    //however does not get called on
    // console.log("useEffect")
    // if (Cookies.get("jwt") === null) {
    //   navigate("/login") //check for no jwt cookie, redirect to login if none
    // }
    //setLoggedIn(Cookies.get("jwt") !== null)
  }, [])

  //console.log('private route')
  return loginState ? <Outlet /> : <Navigate to="/login" />
}
