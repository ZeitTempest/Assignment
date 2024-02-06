import "../App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
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

  const BrowserRoutes = () => {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/tms" element={<TMSPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }

  return <BrowserRoutes />
}
