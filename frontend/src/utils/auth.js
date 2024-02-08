import Cookie from "js-cookie"

export const isLoggedIn = () => {
  return Cookie.get("jwt") ? true : false
}

export const logoutUser = () => {
  console.log("logoutUser")
  const res = Cookie.remove("jwt")
  return res
}
