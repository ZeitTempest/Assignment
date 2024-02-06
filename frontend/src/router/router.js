import "../App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"
import Axios from "axios"

//My Components
import Header from "../pages/Header"
import LoginPage from "../pages/LoginPage"
import TMSPage from "../pages/TMSPage"

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  }

  const isLoggedIn = false

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={isLoggedIn ? <Navigate to="/tms" /> : <Navigate to="/login" />} /> {/* asdf */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tms" element={<TMSPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

  return <BrowserRoutes />
}
