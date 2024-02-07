import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    // <header classNameName="header-bar bg-primary mb-3">
    //   <div classNameName="container d-flex flex-column flex-md-row align-items-center p-3">
    //     <h4 classNameName="my-0 mr-md-auto font-weight-normal">
    //       <Link to="/" classNameName="text-white">
    //         {" "}
    //         TMS{" "}
    //       </Link>
    //     </h4>
    //     <form classNameName="mb-0 pt-2 pt-md-0">
    //       <div classNameName="row align-items-center">
    //         <div classNameName="col-md-auto">{/* <button classNameName="btn btn-success btn-sm">Sign Out</button> */}</div>
    //       </div>
    //     </form>
    //   </div>
    // </header>

    <header>
      <nav className="bg-white fixed h-18 w-full border-gray-200 border-b px-4 lg:px-6 py-2.5 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={require("../assets/TMS_Logo2.png")} className="mr-3 h-6 lg:h-12" alt="TMS Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">TMS</span>
          </Link>
          <div className="flex items-center lg:order-2"></div>
        </div>
      </nav>
    </header>
  )
}

export default Header
