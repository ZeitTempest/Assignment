import { executeQuery } from "../config/query.js"

export const findAll = async () => {
  const findAllQry = `SELECT * FROM groups;`;
  console.log("i am still run");
  try {
    const [groups] = await executeQuery(findAllQry);
    return groups;
  } catch (err) {
    throw new Error(err);
  }
};

export const createSecGroup = async (groupname) => {
  const createGrpQry = `INSERT INTO \`groups\` (groupname) values ('${groupname}')`;

  try {
    const res = await executeQuery(createGrpQry);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const findGroup = async (groupname) => {
  const findAllQry = `SELECT * FROM \`groups\` where groupname=${groupname};`;
  try {
    const [groups] = await executeQuery(findAllQry);
    if (groups.length > 1) {
      const error = new Error("multiple rows found");
      error.code = 500;
      throw error;
    }
    return groups;
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  findAll,
  findGroup,
  createSecGroup,
};
