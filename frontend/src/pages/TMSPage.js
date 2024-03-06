import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Page from "../components/Page"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
import DispatchContext from "../DispatchContext"
import dayjs from "dayjs"

function TMSPage() {
  const appDispatch = useContext(DispatchContext)

  const [apps, setApps] = useState([])
  const [isPL, setIsPL] = useState(false)

  const navigate = useNavigate()

  async function checkPL() {
    try {
      const groupname = "project-lead"
      const response = await Axios.post("/verifyAccessGroup", { groupname })
      setIsPL(response.data.userIsInGroup)
    } catch (err) {
      console.log(err)
    }
  }

  async function getAppsTable() {
    try {
      const allApps = await Axios.get("/app/apps")

      setApps(allApps.data)
      // console.log(response.data)
    } catch (err) {
      console.log(err)
      if (err.code >= 400) {
        appDispatch({ type: "logout" })
        navigate("/logout")
      }
    }
  }

  useEffect(() => {
    getAppsTable()
    checkPL()
  }, [])

  function onSelectApp(App_Acronym) {
    navigate(`/editApp/${App_Acronym}`)
    return
  }

  return (
    <Page title="Home">
      <section className="bg-gray-50 bg-light-gray-600 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-24 sm:max-w-screen-lg xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center text-white">Welcome to TMS</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:my-2 sm:max-w-screen-mx xl:p-0 bg-blue-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center text-teal-100">Applications</h1>
              {isPL ? (
                <button type="submit" className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center">
                  Add Application
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex space-x-4 sm:p-8 ">
              <div className="flex-col w-full justify-center items-center space-y">
                {/* column 1 */}
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead class="text-xs text-gray-100 uppercase bg-gray-700 text-gray-200 text-center">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          App Acronym
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Start Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                          End Date
                        </th>
                        <th scope="col" class="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map(app => {
                        return (
                          <>
                            <tr>
                              <td class="px-6 py-4 bg-gray-300 text-gray-800">
                                <Link to={`/${app.App_Acronym}`}> {app.App_Acronym}</Link>
                              </td>
                              <td class="px-6 py-4 bg-gray-300 text-gray-800">{app.App_startDate ? dayjs(app.App_startDate).format("DD/MM/YYYY") : "No Start Date"}</td>
                              <td class="px-6 py-4 bg-gray-300 text-gray-800">{app.App_endDate ? dayjs(app.App_endDate).format("DD/MM/YYYY") : "No End Date"}</td>
                              <td class="px-6 py-4 bg-gray-300 text-gray-800">
                                {isPL ? (
                                  <button type="submit" onClick={() => onSelectApp(app.App_Acronym)} className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center">
                                    View/Edit
                                  </button>
                                ) : (
                                  <button type="submit" onClick={() => onSelectApp(app.App_Acronym)} className="w-40 self-auto text-white bg-teal-500 hover:bg-teal-700 focus:ring-blue-gray-200 focus:outline-none rounded-lg font-bold text-sm px-5 py-2.5 text-center">
                                    View
                                  </button>
                                )}
                              </td>
                            </tr>
                          </>
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

export default TMSPage
