import React, { useState, useContext, useEffect } from "react"

import { Link } from "react-router-dom"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Tooltip } from "@mui/material"
import DispatchContext from "../DispatchContext"

import { logoutUser } from "../utils/auth"
import Axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
//import DispatchContext from "../DispatchContext"

function TaskBoard(props) {
  const [openTasks, setOpenTasks] = useState([])
  const [todoTasks, setTodoTasks] = useState([])
  const [doingTasks, setDoingTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])
  const [closedTasks, setClosedTasks] = useState([])
  const appName = props.appName

  const appDispatch = useContext(DispatchContext)

  async function getTasks(state) {
    try {
      const response = await Axios.post("/tasks", { state, appName })
      switch (state) {
        case "open":
          setOpenTasks(response.data)
          break
        case "todo":
          setTodoTasks(response.data)
          break
        case "doing":
          setDoingTasks(response.data)
          break
        case "done":
          setDoneTasks(response.data)
          break
        case "closed":
          setClosedTasks(response.data)
          break
        default:
          break
      }
    } catch (err) {
      //console.log(err)
    }
  }

  useEffect(() => {
    getTasks("open")
    getTasks("todo")
    getTasks("doing")
    getTasks("done")
    getTasks("closed")
  }, [])

  //const navigate = useNavigate()

  return (
    <Grid container>
      <Grid item xs={2.4}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Open</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {openTasks.map((open) => (
                <TableRow>
                  <TableCell align="center">
                    <Card
                      variant="outlined"
                      style={{ backgroundColor: "#F85297" }}
                    >
                      <CardContent>
                        <Tooltip title="View Task" arrow>
                          {" "}
                          <Link to={`/${open.Task_id}`}>
                            {open.Task_name} (ID: {open.Task_id})
                          </Link>
                        </Tooltip>
                        <br></br>
                        Plan: {open.Task_plan}
                        <br></br>
                        Owner: {open.Task_owner}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={2.4}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Todo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoTasks.map((todo) => (
                <TableRow>
                  <TableCell align="center">
                    <Card
                      variant="outlined"
                      style={{ backgroundColor: "#9F98F3" }}
                    >
                      <CardContent>
                        <Tooltip title="View Task" arrow>
                          <Link to={`/${todo.Task_id}`}>
                            {todo.Task_name} (#{todo.Task_id})
                          </Link>
                        </Tooltip>
                        <br></br>
                        Plan: {todo.Task_plan}
                        <br></br>
                        Owner: {todo.Task_owner}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={2.4}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Doing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doingTasks.map((doing) => (
                <TableRow>
                  <TableCell align="center">
                    <Card
                      variant="outlined"
                      style={{ backgroundColor: "#ACBBF3" }}
                    >
                      <CardContent>
                        <Tooltip title="View Task" arrow>
                          <Link to={`/${doing.Task_id}`}>
                            {doing.Task_name} (#{doing.Task_id})
                          </Link>
                        </Tooltip>
                        <br></br>
                        Plan: {doing.Task_plan}
                        <br></br>
                        Owner: {doing.Task_owner}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={2.4}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Done</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doneTasks.map((done) => (
                <TableRow>
                  <TableCell align="center">
                    <Card
                      variant="outlined"
                      style={{ backgroundColor: "#ADE3EC" }}
                    >
                      <CardContent>
                        <Tooltip title="View Task" arrow>
                          <Link to={`/${done.Task_id}`}>
                            {done.Task_name} (#{done.Task_id})
                          </Link>
                        </Tooltip>
                        <br></br>
                        Plan: {done.Task_plan}
                        <br></br>
                        Owner: {done.Task_owner}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={2.4}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Closed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {closedTasks.map((closed) => (
                <TableRow>
                  <TableCell align="center">
                    <Card
                      variant="outlined"
                      style={{ backgroundColor: "#E6B6F1" }}
                    >
                      <CardContent>
                        <Tooltip title="View Task" arrow>
                          <Link to={`/${closed.Task_id}`}>
                            {closed.Task_name} (#{closed.Task_id})
                          </Link>
                        </Tooltip>
                        <br></br>
                        Plan: {closed.Task_plan}
                        <br></br>
                        Owner: {closed.Task_owner}
                      </CardContent>
                    </Card>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}
export default TaskBoard
