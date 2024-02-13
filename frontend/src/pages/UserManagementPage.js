import React, { useState /*, useContext*/ } from "react"
import Page from "../components/Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function UserManagementPage() {
  return (
    <Page title="User Management">
      <section className="bg-gray-50 bg-gray-600 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-24 sm:max-w-screen-lg xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center text-white">Manage User</h1>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default UserManagementPage
