import "./App.css"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Axios from "axios"
import Cookies from "js-cookie"

import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useImmerReducer } from "use-immer"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

//My Components
import Router from "./router/router"

//Configuring Axios
Axios.defaults.baseURL = "http://localhost:8000"
Axios.defaults.withCredentials = true
Axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("jwt")}`

function App() {
  const initialState = {
    loggedIn: Boolean(Cookies.get("jwt")),
    jwt: Cookies.get("jwt")
  }

  const ourReducer = (draft, action) => {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.jwt = action.data.jwt
        Axios.defaults.headers.common["Authorization"] = `Bearer ${action.data.jwt}`
        break
      case "logout":
        draft.loggedIn = false
        break
      case "toast-success":
        toast.success(action.data)
        break
      case "toast-failed":
        toast.error(action.data)
        break
      default:
        break
    }
  }


  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      Cookies.set("jwt", state.jwt)
    } else {
      Cookies.remove("jwt")
      Axios.defaults.headers.common["Authorization"] = null
    }
  },[state.loggedIn, state.jwt])

  return (
    <>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Router />
          <ToastContainer position="bottom-right" autoClose={2000}/>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </>
  )
}

if (module.hot) {
  module.hot.accept()
}

export default App
