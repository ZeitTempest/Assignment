import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="header-bar bg-primary mb-3">
      <div className="container d-flex flex-column flex-md-row align-items-center p-3">
        <h4 className="my-0 mr-md-auto font-weight-normal">
          <Link to="/" className="text-white">
            {" "}
            ComplexApp{" "}
          </Link>
        </h4>
        <form className="mb-0 pt-2 pt-md-0">
          <div className="row align-items-center">
            <div className="col-md-auto">{/* <button className="btn btn-success btn-sm">Sign Out</button> */}</div>
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
