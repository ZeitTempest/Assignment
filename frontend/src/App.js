import "./App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Axios from "axios"
import Cookies from "js-cookie"

//My Components
import Router from "./router/router"

//Configuring Axios
Axios.defaults.baseURL = "http://localhost:8000"
Axios.defaults.withCredentials = true
Axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`

function App() {
  return (
    <>
      <Router />
    </>
  )
}

if (module.hot) {
  module.hot.accept()
}

export default App
