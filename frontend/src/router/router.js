import "../App.css"
import { React, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "../pages/Header"

//My Components
import LoginPage from "../pages/LoginPage"
import TMSPage from "../pages/TMSPage"

export default function BrowserRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="" element={<Navigate to="/home" />} /> {/* root redirect to login or tms */}
          <Route path="/home" element={<TMSPage />} />
        </Route>

        {/**non auth route: redirect to login */}
        <Route path="/login" element={Cookies.get("jwt") ? <Navigate to="/" /> : <LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
const PrivateRoute = () => {
  // useEffect(() => {
  //   //gets called on first render and state change/re-render
  //   //however does not get called on
  //   console.log("useEffect")
  //   if (Cookies.get("jwt") === null) {
  //     navigate("/login") //check for no jwt cookie, redirect to login if none
  //   }
  //   //setLoggedIn(Cookies.get("jwt") !== null)
  // })

  return Cookies.get("jwt") ? <Outlet /> : <Navigate to="/login" />
}
