import React from "react";
import { Link, Navigate } from "react-router-dom";

function Header() {
  return (
    // <header className="header-bar bg-primary mb-3">
    //   <div className="container d-flex flex-column flex-md-row align-items-center p-3">
    //     <h4 className="my-0 mr-md-auto font-weight-normal">
    //       <Link to="/" className="text-white">
    //         {" "}
    //         TMS{" "}
    //       </Link>
    //     </h4>
    //     <form className="mb-0 pt-2 pt-md-0">
    //       <div className="row align-items-center">
    //         <div className="col-md-auto">{/* <button className="btn btn-success btn-sm">Sign Out</button> */}</div>
    //       </div>
    //     </form>
    //   </div>
    // </header>

    <header>
      <nav className="fixed h-18 w-full border-gray-200 border-b px-4 lg:px-6 py-2.5 bg-blue-900">
        <div className="flex flex-wrap justify-around justify-items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src={require("../assets/TMS_Logo2.png")}
              className="mr-3 h-6 lg:h-12"
              alt="TMS Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              TMS
            </span>
          </Link>
          <div className="flex items-right lg:order-2">
            <HeaderLoggedIn />
          </div>
        </div>
      </nav>
    </header>
  );
}

function HeaderLoggedIn() {
  return (
    <div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-2 px-4 rounded">
        My Details
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white mx-2 font-bold py-2 px-4 rounded">
        Logout
      </button>
    </div>
  )
}

export default Header
