import React, { useState /*, useContext*/ } from "react"
import Page from "../components/Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function MyDetails() {
  return (
    <Page title="My Details">
      <section className="bg-gray-50 dark:bg-gray-600 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-24 sm:max-w-screen-lg
         xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center dark:text-white">My Details</h1>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default MyDetails
