//import { findAllGroups, createGroupQuery } from "../models/groupsModel.js"
import sql from "../config/query.js"

export const getAllGroups = async (req, res) => {
  try {
    const findAllQry = `SELECT * FROM tmsdatabase.groups;`

    const allGroups = await sql.query(findAllQry)

    res.status(200).json(allGroups[0])
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body
    // verify fits constraints
    const groupnameMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(groupname)
    if (!groupnameMeetsConstraints) {
      return res.status(500).json("Group name contains illegal characters.")
    }

    if (groupname.length < 3 || groupname.length > 20) {
      return res.status(500).json("Group name must be between 3 - 20 characters.")
    }

    //check for duplicate entry
    const findAllQry = `SELECT * FROM tmsdatabase.groups;`

    const allGroups = await sql.query(findAllQry)

    for (const group of allGroups[0]) {
      if (group.groupname === groupname) {
        return res.status(500).json("Group name already exists.")
      }
    }

    const createGrpQry = `INSERT INTO tmsdatabase.groups values ( ? )`
    await sql.query(createGrpQry, groupname)
    return res.status(200).json("Successfully created group.")
  } catch (err) {
    res.status(500).json(err)
  }
}

export const updateGroup = async (req, res) => {
  try {
    const username = req.body.username
    const groups = req.body.groups
    let group_name = ""
    if (groups.length > 0) {
      group_name = groups.join() + ","
    }
    sql.query("UPDATE accounts SET groupNames = ? WHERE username = ?", [group_name, username], function (err, result) {
      if (err) {
        console.log(err)
      } else {
        if (result) {
          res.status(200).json("updated groups")
        }
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
