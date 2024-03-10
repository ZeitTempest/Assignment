import React, { useEffect, useState /*, useContext*/ } from "react"
import Page from "../components/Page"
//import { logoutUser } from "../utils/auth"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
import CreateGroupForm from "../components/CreateGroupForm"
import CreateUserForm from "../components/CreateUserForm"
import ViewRow from "../components/ViewRow"

import { useContext } from "react"
import DispatchContext from "../DispatchContext"

function UserManagementPage() {
  const appDispatch = useContext(DispatchContext)

  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [groupList, setGroupList] = useState([])
  const [refresh, setRefresh] = useState(false)

  async function getUsersTable() {
    try {
      const response = await Axios.get("/allUsers")
      setUsers(response.data)

      // console.log(response.data)
      const allGroups = []
      response.data.forEach((user) => {
        const thisUserGroups = user.groups?.split(",")

        allGroups.push({ user: user.username, groups: thisUserGroups })
        //allGroups.push({ user: user.username, groups: thisUserGroups !== "" ? thisUserGroups : null });
      })

      //console.log(allGroups)

      setGroups(allGroups)
    } catch (err) {
      console.log(err)
      if (err.code >= 400) {
        appDispatch({ type: "logout" })
        navigate("/logout")
      }
    }
  }

  function findUserGroups(username) {
    const group = groups.find((group) => group.user === username)
    if (group) {
      return group.groups
    } //else return null
  }

  async function getGroupsList() {
    //returns array of all groups
    try {
      const response = await Axios.get("/allGroups")

      if (response.data) {
        const options = []
        response.data.forEach((group) => {
          options.push(group.groupname)
        })
        setGroupList(options)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUsersTable()
    getGroupsList()
    setRefresh(false)
  }, [refresh])

  return (
    <Page title="User Management">
      <section className="bg-blue-gray-100 min-h-screen">
        <CreateGroupForm setRefresh={setRefresh} />
        <CreateUserForm groupList={groupList} setRefresh={setRefresh} />
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:my-2 sm:max-w-screen-mx xl:p-0 bg-white border-gray-300">
            <div className="p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-center text-blue-900">
                Manage Users
              </h1>
            </div>
            <div className="flex space-x-4 px-8 pb-8">
              <div className="flex-col w-full justify-center items-center space-y">
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead class="text-xs text-gray-100 uppercase bg-gray-700 text-center">
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
                      {users.map((user) => {
                        return (
                          <ViewRow
                            username={user.username}
                            email={user.email}
                            isActive={user.isActive}
                            groupList={groupList}
                            userGroups={findUserGroups(user.username)}
                            setRefresh={setRefresh}
                          />
                        )
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
