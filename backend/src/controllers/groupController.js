import { findAllGroups, createGroupQuery } from "../models/groupsModel.js"
import { isAlphaNumeric, passwordCompliant, emailCompliant } from "../utils/utils.js"

export const getAllGroups = async (req, res) => {
  try {
    const groups = await findAllGroups()
    res.status(200).json(groups)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body

    // verify fits constraints
    const groupnameMeetsConstraints = isAlphaNumeric(groupname) && groupname.length >= 3 && groupname.length <= 20

    if (!groupnameMeetsConstraints) {
      return res.status(401).json("Invalid username.")
    }

    const group = await createGroupQuery(groupname)
    res.status(200).json(group)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
