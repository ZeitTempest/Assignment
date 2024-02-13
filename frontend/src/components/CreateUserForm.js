import axios from "axios"

const CreateUserForm = () => {
  return (
    <div className="flex items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="w-full rounded-lg shadow border md:my-2 sm:max-w-screen-lg xl:p-0 bg-gray-800 border-gray-700">
        <div className="flex space-x-6 sm:p-8 items-center justify-end">
          <div className="flex-col space-y">
            {/*Username Field*/}
            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Username" required="" />
          </div>
          <div className="flex-col space-y">
            {/*Password Field*/}
            <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Password" required="" />
          </div>
          <div className="flex-col space-y">
            {/*Email Field*/}
            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Email" required="" />
          </div>
          <div className="flex-col space-y">
            {/*Add Groups Field*/}
            <input type="addgroups" name="addgroups" id="addgroups" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Add Groups" required="" />
          </div>
          <div>
            {/* Submit Button */}
            <button type="submit" className="w-40 self-auto text-white text-sm bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 text-center focus:ring-blue-800">
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUserForm
