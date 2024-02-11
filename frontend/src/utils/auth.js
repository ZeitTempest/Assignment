import Cookie from "js-cookie"

export const isLoggedIn = () => {
  return Cookie.get("jwt") ? true : false
}

//logout state change dispatch
// const Logout = () => {
//   const res = dispatch(logout());
//   console.log("logout", res);
// };

export const logoutUser = () => {
  console.log("logoutUser")
  const res = Cookie.remove("jwt")
  return res
}
