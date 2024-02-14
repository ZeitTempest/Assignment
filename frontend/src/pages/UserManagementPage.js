import React, { useEffect, useState /*, useContext*/ } from "react"
import Page from "../components/Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
import CreateGroupForm from "../components/CreateGroupForm"
import CreateUserForm from "../components/CreateUserForm"
import ViewRow from "../components/ViewRow"

//import DispatchContext from "../DispatchContext"

function UserManagementPage() {
  const [users, setUsers] = useState([])

  async function getUsersTable() {
    try {
      const response = await Axios.get("/allUsers")
      console.log(response.data[0])
      setUsers(response.data[0])
    } 
    catch (e) { 
      console.log(e)     
      if(e.code >= 400){
      logoutUser()
      navigate("logout")}
  }

  useEffect(() => {
    getUsersTable()
  }, [])

  return (
    <Page title="User Management">
      <section className="bg-gray-300 min-h-screen">
        <CreateGroupForm />
        <CreateUserForm />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:my-2 sm:max-w-screen-mx xl:p-0 bg-blue-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center text-teal-100">Manage Users</h1>
            </div>
            <div className="flex space-x-4 sm:p-8 ">
              <div className="flex-col w-full justify-center items-center space-y">
                {/* column 1 */}
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-700 text-gray-200 text-center">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Username
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Password
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Groups
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Active
                        </th>
                        <th scope="col" class="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => {
                        return <ViewRow username={user.username} email={user.email} isActive={user.isActive} />
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

export default UserManagementPage
