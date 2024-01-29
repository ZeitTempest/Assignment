import React from "react"
import Page from "./Page"

function HomeGuest() {
  return (
    <Page title="Home" wide={true}>
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input id="username-register" name="username" className="form-control" type="text" placeholder="Enter username" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input id="password-register" name="password" className="form-control" type="password" placeholder="Enter password" />
            </div>
            <button type="submit" className="py-2 mt-5 btn btn-md btn-success btn-block">
              Log In
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default HomeGuest
