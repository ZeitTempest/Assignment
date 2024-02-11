import { findByUsername } from "../models/authModel.js"
import { isAlphanumeric } from "../utils/utils.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const secret = process.env.JWTSECRET
const expiresIn = "1h"

export const userLogin = async (req, res) => {
  const { username, password } = req.body
  const usernameCompliant = isAlphanumeric(username) //simple check for username compliance to reduce server load

  if (!usernameCompliant) {
    return res.status(401).json({
      success: false,
      err: "username non compliant"
    })
  }

  try {
    const usersList = await findByUsername(username)

    if (usersList.length != 1) return res.status(401).json({ success: false, err: "users list length not equal to 1" })

    //const isPwdCorrect =  bcrypt.compareSync(password, users[0].password)
    const pwdCheck = password === usersList[0].password

    if (!pwdCheck) {
      return res.status(401).json({ success: false, err: "pwdCheck failed" })
    }

    //jwt token here
    const token = jwt.sign({ username }, secret, { expiresIn: 60 * 60 })
    console.log(`token: ${token}`)
    res.cookie("jwt", token, {
      // httpOnly: true, // cannot access cookie via js in client
      // secure: true, // Only sent over HTTPS
      maxAge: 3600000 // expiration milliseconds
      // sameSite: "strict", // Restricts the cookie to be sent only with requests originating from the same site
    })
    res.status(200).json({ success: true, result: true, data: usersList[0].username })
  } catch (e) {
    console.log(e)
    res.status(500).json(e)
  }
}

export const CheckGroup = async (username, groupname) => {
  try {
    const users = await findByUsername(username)
    if (users.length !== 1) {
      //user not found
      return false
    }
    const groupsData = users[0].groups
    // console.log(groupsData) //print full contents of groups
    return groupsData.split(",").includes(groupname)
  } catch (e) {
    throw new Error(e)
  }
}

export const adminRegister = async (req, res) => {
  try {
    const { username, password, email, groups } = req.body;

    // check submitted JWT is a valid admin
    const isAdmin = await Checkgroup(req.byUser, "admin");

    if (!isAdmin) {
      return res.status(401).json("User is not an admin.");
    }

    // verify fits constraints
    const meetsContraints =
      isAlphaNumeric(username) && username.length >= 3 && username.length <= 20;

    if (!meetsContraints) {
      return res.status(401).json("Invalid user details.");
    }

    // verify groups are valid
    const allSecGroups = await secGroups.findAll();
    const secGroupsSet = new Set(allSecGroups.map((row) => row.groupname));

    let invalidGrps = "";
    for (const grp of groups) {
      if (!secGroupsSet.has(grp)) {
        invalidGrps += grp;
      }
    }

    if (invalidGrps) {
      return res
        .status(401)
        .json(`${invalidGrps} group does not exists, please create them first`);
    }

    // find if user already exists
    let user = await findById(username);

    // reject if user already exists
    if (user.length >= 1) {
      const error = new Error("User already exists");
      error.code = 400;
      throw error;
    }

    // create hash
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    user = await createUser({
      ...req.body,
      password: hash,
      groups: groups.join(","),
    });

    const token = jwt.sign({ username }, secret, { expiresIn });

    if (!token || !user) {
      return res
        .status(401)
        .json({ success: false, err: "failed to create user" });
    }

    res.status(200).json({ data: { token, user } });
  } catch (err) {
    res.status(err.code).json(err);
  }
};

export const verifyAccessGroup = async (req, res) => {
  try {
    const { userid, groupname } = req.body;
    const userIsInGroup = await Checkgroup(userid, groupname);
    return res.status(200).json({ success: true, userIsInGroup });
  } catch (err) {
    res.status(500).json(err);
  }
};