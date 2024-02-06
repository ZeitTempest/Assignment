import "./App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Axios from "axios"

//My Components
import Router from "./router/router"

// Configuring Axios
Axios.defaults.baseURL = "http://localhost:8000"

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
