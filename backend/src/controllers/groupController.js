import { findAllGroups, createGroupQuery } from "../models/groupsModel.js"
import sql from "../config/query.js"

export const getAllGroups = async (req, res) => {
  try {
    const findAllQry = `SELECT * FROM tmsdatabase.groups;`
    
    const groups = await sql.query(findAllQry)
    
    res.status(200).json(groups[0])
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body

    // verify fits constraints
    const groupnameMeetsConstraints = 
    new RegExp("^[a-zA-Z0-9]+$").test(groupname) && groupname.length >= 3 && groupname.length <= 20

    if (!groupnameMeetsConstraints) {
      return res.status(401).json("Invalid group name.")
    }

    const group = await createGroupQuery(groupname)

    async groupname => {
      const createGrpQry = `INSERT INTO tmsdatabase.groups (groupname) values ( ? )`
    
      const res = await sql.query(createGrpQry, groupname)
      res.status(200).json(group)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
