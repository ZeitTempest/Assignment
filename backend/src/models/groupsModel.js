import sql from "../config/query.js"

export const findAll = async () => {
  const findAllQry = `SELECT * FROM groups;`;
  try {
    const [groups] = await sql.query(findAllQry);
    return groups;
  } catch (err) {
    throw new Error(err);
  }
};

export const createGroupQuery = async (groupname) => {
  const createGrpQry = `INSERT INTO \`groups\` (groupname) values ('${groupname}')`;

  try {
    const res = await sql.query(createGrpQry);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

export const findGroupQuery = async (groupname) => {
  const findAllQry = `SELECT * FROM \`groups\` where groupname=${groupname};`;
  try {
    const [groups] = await sql.query(findAllQry);
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
  findGroupQuery,
  createGroupQuery,
};
