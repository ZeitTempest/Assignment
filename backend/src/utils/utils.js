//prettier-ignore
export const isAlphaNumeric = val => 
new RegExp("^[a-zA-Z0-9]+$").test(val) //test if string is compliant with our regex

export const charLengthCompliant = (val, min, max) => {
  const length = val.length
  return length >= min && length <= max
} //test if string is compliant with our length requirements

//function for converting to lowercase - used for username, group names tec

export const isLoginCompliant = val => {
  //check neither field blank
  //check if username charLengthCompliant
  return 0
}
