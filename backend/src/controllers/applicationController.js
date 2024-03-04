import sql from "../config/query.js"

async function findApp(appname){
  return new Promise((resolve, reject) => {
    sql.query(
      "SELECT * FROM application WHERE App_Acronym = ? ",
      [appname],
      function (err, results) {
        if (err) {
          resolve(false);
        }
        if (results.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

function validateAcronym(res, acronym) {
  const regex = "^[a-zA-Z0-9]+$";
  let error = false;
  if (acronym.length < 3 || acronym.length > 20) {
    res.write("AcronymLength ");
    error = true;
  }
  if (!acronym.match(regex)) {
    res.write("AcronymCharacter ");
    error = true;
  }
  return error;
}

function validateDates(res, startDate, endDate) {
  const startArr = new Date(startDate);
  const endArr = new Date(endDate);
  if (startArr > endArr) {
    res.write("DatesInvalid ");
  }
  return startArr > endArr;
}

export const createApp = async (req, res) => {
  console.log("createApp")
}

export const getApps = async (req, res) => {
  console.log("getApps")
}

export const getApp = async (req, res) => {
  console.log("getApp")
}

export const editApp = async (req, res) => {
  console.log("editApp")
}

export const getPermit = async (req, res) => {
  console.log("getPermit")
}