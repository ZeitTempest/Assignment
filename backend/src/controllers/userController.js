import { userLoginResult } from "../models/userModel.js"

export const loginUser = async (req, res, next) => {
  try {
    const { success, data, err } = await userLoginResult(req.body)
    if (!success) {
      res.status(401).json(err) //username/pw check failed
    }
    res.status(200).json(data) //otherwise success
  } catch (err) {
    console.log(err)
    res.status(500).json(err) //db return error
  }
  // if (req.body.username) {
  //   res.json({
  //     replyMsg: `Request with name ${req.body.username} and pw ${req.body.password} received.`
  //   })
  // } else {
  //   res.json({
  //     replyMsg: `Request with no name received.`
  //   })
  // }
}
