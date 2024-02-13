import axios from "axios"

const CreateGroupForm = () => {
  const onFinish = async ({ groupName }) => {
    const res = await axios.post("createGroup", { groupName })
  }

  const onFinishFailed = errorInfo => {
    console.log("failed:", errorInfo)
    //IF JWT NO AUTH, DO LOGOUT
  }

  return (
    <div className="flex items-center justify-center px-6 mx-auto lg:py-0">
      <div className="w-full rounded-lg shadow border md:mt-24 mb-2 sm:max-w-screen-lg xl:p-0 bg-gray-800 border-gray-700">
        <div className="flex space-x-6 sm:p-8 items-center justify-end">
          <div className="flex-col space-y">
            {/* column 1 */}
            <input type="username" name="groupname" id="groupname" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-600 focus:border-blue-600 text-xs block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Group Name" required="" />
          </div>
          <div>
            {/* column 2 */}
            <button type="submit" className="w-40 self-auto text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold text-sm rounded-lg px-5 py-2.5 text-center focus:ring-blue-800">
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateGroupForm
