import Cookie from "js-cookie"

export const isLoggedIn = () => {
  const hasjwt = Cookie.get("jwt")
  console.log("is logged in?:")
  console.log(hasjwt)
  return Cookie.get("jwt")
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
