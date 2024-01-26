import React, { useEffect } from "react"

function Container(props) {
  return <div className={"container py-md-5 " + (props.wide ? "" : "container--narrow")}>{props.children}</div>
} //uses a ternary operator to add additional class 'container--narrow' if wide property is not specified

export default Container
