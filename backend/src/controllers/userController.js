const query = require("../config/query")

exports.loginUser = (req, res, next) => {
  if (req.body.username) {
    res.json({
      replyMsg: `Request with name ${req.body.username} and pw ${req.body.password} received.`
    })
  } else {
    res.json({
      replyMsg: `Request with no name received.`
    })
  }
}
