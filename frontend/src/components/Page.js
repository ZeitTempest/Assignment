import React, { useEffect } from "react"
import Container from "./Container"

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | ComplexApp`
    window.scrollTo(0, 0) //scroll up to top of page
    //these are all standard web browser/DOM code, not React
  }, []) //first arg is a function we want to run at a specific time, 2nd arg is list of dependencies we
  //are watching to see if they change to then run the function
  return <Container wide={props.wide}>{props.children}</Container>
}

export default Page
