import React, { useState /*, useContext*/ } from "react"
import Page from "../components/Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
import CreateGroupForm from "../components/CreateGroupForm"
import CreateUserForm from "../components/CreateUserForm"

//import DispatchContext from "../DispatchContext"

function UserManagementPage() {
  return (
    <Page title="User Management">
      <section className="bg-gray-50 bg-gray-300 min-h-screen">
        <CreateGroupForm />
        <CreateUserForm />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:my-2 sm:max-w-screen-lg xl:p-0 bg-blue-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center text-teal-300">Manage Users</h1>
            </div>
            <div className="flex space-x-4 sm:p-8 ">
              <div className="flex-col space-y">
                {/* column 1 */}
                <h1 className="text-center text-white">Test</h1>
              </div>
              <div>
                {/* column 2 */}
                <h1 className="text-center text-white">Test</h1>
              </div>
              <div>
                {/* column 3 */}
                <h1 className="text-center text-white">Test</h1>
              </div>
              <div>
                {/* column 4 */}
                <h1 className="text-center text-white">Test</h1>
              </div>
              <div>
                {/* column 5 */}
                <h1 className="text-center text-white">Test</h1>
              </div>
              <div>
                {/* column 6 */}
                <h1 className="text-center text-white">Test</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default UserManagementPage
