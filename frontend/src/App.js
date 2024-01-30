import "./App.css"
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//My Components
import Header from "./components/Header"
import LoginPage from "./components/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

if (module.hot) {
  module.hot.accept()
}

export default App
