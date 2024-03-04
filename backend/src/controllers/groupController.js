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
    const groupnameMeetsConstraints = new RegExp("^[a-zA-Z0-9]+$").test(groupname) && groupname.length >= 3 && groupname.length <= 20

    if (!groupnameMeetsConstraints) {
      return res.status(401).json("Invalid group name.")
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
