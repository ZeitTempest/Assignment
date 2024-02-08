import React, { useEffect } from "react"

function Container(props) {
  return <div>{props.children}</div>
} //uses a ternary operator to add additional class 'container--narrow' if wide property is not specified

export default Container
