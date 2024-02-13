import React, { useState /*, useContext*/ } from "react"
import Page from "../components/Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function MyDetails() {
  return (
    <Page title="My Details">
      <section className="bg-gray-50 bg-gray-600 flex">
        <div className="items-center flex flex-col basis-1/2 justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-teal-300">My Details</h1>
              <div>
                <label className="block mb-2 text-lg font-medium text-blue-300">Username</label>
                <label className="block mb-2 text-lg font-medium text-white">myusername</label>
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-blue-300">Email</label>
                <label className="block mb-2 text-lg font-medium text-white">myemail@address</label>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center flex flex-col basis-1/2 justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="justify-self-center p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-teal-300">Edit Details</h1>
              <div>
                <label className="block mb-2 text-lg font-medium text-blue-300">Change My Email</label>
                <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="New Email" required="" />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-blue-300">Change My Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
              </div>
              <button type="submit" className="w-1/2 self-auto text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800">
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default MyDetails
