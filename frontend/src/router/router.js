import "../App.css"
import { React, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom"
import Axios from "axios"
import Cookies from "js-cookie"

//My Components
import Header from "../pages/Header"
import LoginPage from "../pages/LoginPage"
import TMSPage from "../pages/TMSPage"

export default function Router() {
  const Layout = () => {
    const navigate = useNavigate()

    useEffect(() => {
      //gets called on first render and state change/re-render
      //however does not get called on
      if (!Cookies.get("jwt")) {
        navigate("/login") //check for no cookie, redirect to login if none
      }
      //setLoggedIn(Cookies.get("jwt") !== null)
    })

    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  }

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Navigate to="/tms" />} /> {/* root redirect to login or tms */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tms" element={<TMSPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

  return <BrowserRoutes />
}
