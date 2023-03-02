import React from "react"
// import { useState } from "react"

const PasswordMeterCustom = ({ password }) => {
  console.log({ password })
  // const [lower, setLower] = useState(0)
  // const [upper, setUpper] = useState(0)
  // const [number, setNumber] = useState(0)
  // const [special, setSpecial] = useState(0)
  // const [possibilities, setPossibilites] = useState(0)
  // Let's define custom scores here

  // Plus Points(+ve additions)
  // no. chars
  // upper letters
  // lower letters
  // numbers
  // symbols
  // middle number or symbols
  // requirements

  // Negative Points (-ve Deductions)
  // Letters
  // Numbers
  // Repeat Characters
  // Consec Upper
  // Consec Lower
  // Consec Numbers     (3+)
  // Sequential Numbers (3+)
  // Sequential Symbols (3+)

  // const widthVal = testResult.score * 100 / 4;
  // const [widthVal, setWidthVal] = useState(password.length * 4)

  // const countSymbols = (password) => {
  // let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  // let format = /[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
  // let count = password.match(format).length
  // console.log({ count })
  // return count
  // }

  /** HELPER FUNCTIONS */
  function hasNumbers(t) {
    var regex = /\d/g
    return regex.test(t)
  }
  function hasLowerCase(str) {
    return /[a-z]/.test(str)
  }
  /** HELPER FUNCTIONS */

  const countPossibilities = (password) => {
    //  = (password) => {
    /**
     * count how many of following categories present:
     * - digits           + 10
     * - uppercase letters + 26
     * - lowercase letters + 26
     * - special characters 128-32 (first 32 ascii chars cant be printed) - 1 (127th ascii - DEL) - (10 + 26 + 26)  - ~!@#$% etc.
     */

    let upper = 0,
      lower = 0,
      number = 0,
      special = 0,
      charSet = 0,
      combinations = 0

    for (var i = 0; i < password.length; i++) {
      if (password[i] >= "A" && password[i] <= "Z") upper++
      else if (password[i] >= "a" && password[i] <= "z") lower++
      else if (password[i] >= "0" && password[i] <= "9") number++
      else special++
    }

    console.log({ upper, lower, number, special })
    if (upper > 0) {
      charSet += 26
    }
    if (lower > 0) {
      charSet += 26
    }
    if (number > 0) {
      charSet += 10
    }
    if (special > 0) {
      charSet += 33
    }

    combinations = password.length > 0 ? Math.pow(charSet, password.length) : 0
    // setLower(lower)
    // setUpper(upper)
    // setNumber(number)
    // setSpecial(special)
    // setPossibilites(combi)

    return { lower, upper, number, special, combinations }
  }
  const { lower, upper, number, special, combinations } =
    countPossibilities(password)

  const testResult = (password) => {
    let score = password.length * 8
    // console.log(score);
    // countSymbols(password)
    return score
  }

  const widthVal = testResult(password)
  // const countNoOfCharacters = password => {
  //   //counts num of char
  // }

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Very weak"
      case 1:
        return "Weak"
      case 2:
        return "Fear"
      case 3:
        return "Good"
      case 4:
        return "Strong"
      default:
        return ""
    }
  }

  const funcProgressColor = (password) => {
    if (password.length <= 2) return "#828282" // grey
    if (password.length <= 5) return "#EA1111" // red
    if (password.length <= 7) return "#FFAD00" // orange
    if (password.length <= 10) return "#9bc158" // light green
    return "#00b500" // bright green
  }

  const changePasswordColor = (password) => ({
    width: `${widthVal}%`, // 0 - 100% here
    background: funcProgressColor(password), // color
    height: "7px", // no change
  })

  return (
    <>
      <h3 className='text-center my-2'>Number of combinations</h3>
      <p className='text-center my-1'>- Based on types of characters</p>
      {/* <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p> */}
      <table className='table'>
        <thead class='thead-dark'>
          <tr>
            <th>Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lower</td>
            <td>{lower}</td>
          </tr>
          <tr>
            <td>Upper</td>
            <td>{upper}</td>
          </tr>
          <tr>
            <td>Digits</td>
            <td>{number}</td>
          </tr>
          <tr>
            <td>Special Characters</td>
            <td>{special}</td>
          </tr>
          <tr>
            <td>Total combinations</td>
            <td>{combinations}</td>
          </tr>
        </tbody>
      </table>

      <div className='progress' style={{ height: "7px" }}>
        <div
          className='progress-bar'
          style={changePasswordColor(password)}
        ></div>
      </div>
    </>
  )
}

export default PasswordMeterCustom
