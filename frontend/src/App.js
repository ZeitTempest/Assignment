import "./App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Axios from "axios"

//My Components
import Header from "./pages/Header"
import LoginPage from "./pages/LoginPage"
import TMSPage from "./pages/TMSPage"

// Configuring Axios
Axios.defaults.baseURL = "http://localhost:8000"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TMSPage />} />
      </Routes>
    </BrowserRouter>
  )
}

if (module.hot) {
  module.hot.accept()
}

export default App
