import React, { useState } from "react"

export const PasswordMeter = (
  {password} : {password: string}
) => {
  console.log("Component loaded")

  const password_length_score = (password: string) => {
    return password.length * 4
  }
  const uppercase_letters = (password: string) => {
    console.log("PASS", [password])
    var occur = password.length - password.replace(/[A-Z]/g, "").length
    return occur
  }

  const uppercase_letters_score = (password: string) => {
    return uppercase_letters(password) * 2
  }

  const lowercase_letters = (password: string) => {
    var occur = password.length - password.replace(/[a-z]/g, "").length
    return occur
  }

  const lowercase_letters_score = (password: string) => {
    return lowercase_letters(password) * 2
  }

  const letters = (password: string) => {
    return uppercase_letters(password) + lowercase_letters(password)
  }

  const numbers = (password: string) => {
    var numCount = password.length - password.replace(/[0-9]/g, "").length
    return numCount
  }

  const numbers_score = (password: string) => {
    return numbers(password) * 4
  }

  const symbols = (password: string) => {
    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi
    var allFoundCharacters = password.match(specialChars)
    return allFoundCharacters ? allFoundCharacters.length : 0
  }

  const symbols_score = (password: string) => {
    return symbols(password) * 6
  }

  const Letters_Only = (password: string) => {
    return uppercase_letters(password) + lowercase_letters(password) >= 1 &&
      numbers(password) === 0 &&
      symbols(password) === 0
      ? true
      : false
  }

  const Letters_Only_score = (password: string) => {
    return Letters_Only(password) ? -password.length : 0
  }

  const Numbers_Only = (password: string) => {
    return uppercase_letters(password) + lowercase_letters(password) === 0 &&
      numbers(password) >= 1 &&
      symbols(password) === 0
      ? true
      : false
  }

  const Numbers_Only_score = (password: string) => {
    return Numbers_Only(password) ? -password.length : 0
  }

  function isNumber(n: any): boolean {
    return !isNaN(parseInt(n)) && !isNaN(n - 0)
  }

  const consecutive_numbers = (password: string) => {
    let arr = password.split("")
    let count = 0

    for (var i = 0; i < arr.length; i += 1) {
      if (isNumber(arr[i]) && isNumber(arr[i + 1])) {
        count++
      }
    }
    return count
  }

  const consecutive_numbers_score = (password: string) => {
    return -consecutive_numbers(password) * 2
  }

  const sequential_numbers = (password: string) => {
    const arr = password.split("")
    let count = 0

    for (var i = 0; i < arr.length - 1; i += 1) {
      if (!(isNumber(arr[i]) && isNumber(arr[i + 1]))) { continue }

      const currentNumber = parseInt(arr[i])
      const nextNumber = parseInt(arr[i+1])
      if (currentNumber + 1 === nextNumber) { count++ }
    }
    return count
  }

  const sequential_numbers_score = (password: string) => {
    return -sequential_numbers(password) * 2
  }

  function isUpper(str: string) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str)
  }

  const consecutive_uppercase = (password: string) => {
    let arr = password.split("")
    let count = 0

    for (var i = 0; i < arr.length - 1; i += 1) {
      if (isUpper(arr[i]) && isUpper(arr[i + 1])) {
        count++
      }
    }
    return count
  }

  const consecutive_upper_score = (password: string) => {
    return -consecutive_uppercase(password) * 2
  }

  function isLower(str: string) {
    return !/[A-Z]/.test(str) && /[a-z]/.test(str)
  }

  const consecutive_lowercase = (password: string) => {
    let arr = password.split("")
    let count = 0

    for (var i = 0; i < arr.length - 1; i += 1) {
      if (isLower(arr[i]) && isLower(arr[i + 1])) {
        count++
      }
    }
    return count
  }

  const consecutive_lowercase_score = (password: string) => {
    return -consecutive_lowercase(password) * 2
  }

  function isSequentialChars(str: string) {
    return /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(
      str
    )
  }

  const lowercase_sequential_count = (password: string) => {
    let count = 0
    password = password.toLowerCase()
    for (var i = 0; i < password.length; i += 1) {
      if (isSequentialChars(password.substring(i, i + 3))) {
        count++
      }
    }
    return count
  }

  const letters_sequential_score = (password: string) => {
    return -lowercase_sequential_count(password) * 2
  }

  const score = (password: string) => {
    let score_val: number =
      password_length_score(password) +
      uppercase_letters_score(password) +
      lowercase_letters_score(password) +
      numbers_score(password) +
      symbols_score(password) +
      Letters_Only_score(password) +
      Numbers_Only_score(password) + 
      consecutive_upper_score(password) +
      consecutive_lowercase_score(password) +
      consecutive_numbers_score(password) + 
      letters_sequential_score(password) + 
      sequential_numbers_score(password)

    score_val = score_val > 100 ? 100 : score_val
    score_val = score_val < 0 ? 0 : score_val
    return `${Math.floor(score_val)}%`
  }

  const complexity_text = (password: string) => {
    /*
    Empty string: Enter a value
    0-19: very weak
    20-39: weak
    40-59: good
    60-79: strong
    80-100: very strong
    */

    if (password.length === 0) {
      return "Please enter a value."
    }

    let score_val = parseInt(score(password))

    if (score_val >= 80) return "Very Strong"
    if (score_val >= 60) return "Strong"
    if (score_val >= 40) return "Good"
    if (score_val >= 20) return "Weak"
    return "Very Weak"
  }

  const funcProgressColor = (password: string) => {
    
    if (password.length <= 2)
      return "#828282"; // grey
    if (password.length <= 5)
      return "#EA1111"; // red
    if (password.length <= 7)
      return "#FFAD00"; // orange
    if (password.length <= 10)
      return "#9bc158"; // light green
    return "#00b500"; // bright green
  };

  const changePasswordColor = (password: string) => ({
    width: `${score(password)}`, // 0 - 100% here
    background: funcProgressColor(password), // color
    height: "7px", // no change
  });

  return (
    <>
      <h3 className='text-center my-2'>Password Meter</h3>

      <div className="progress" style={{ 
        height: "7px", backgroundColor: "#EEE"
      }}>
        <div className="progress-bar" style={changePasswordColor(password)}></div>
      </div>

      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col' colSpan={2}>
              Test Your Password
            </th>
            <th scope='col' colSpan={2}>Minimum Requirements</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope='row'>Score:</th>
            <td>{score(password)}</td>
            <td rowSpan={3} colSpan={2} style={{
              border: 'none'
            }}>
              Minimum 8 characters in length. <br/>
              Contains 3/4 of the following
              items:
              <li>Uppercase Letters</li>
              <li>Lowercase Letters</li>
              <li>Numbers</li>
              <li>Symbols</li>
            </td>
          </tr>
          <tr>
            <th scope='row'>Complexity:</th>
            <td>{complexity_text(password)}</td>
          </tr>
        </tbody>
      </table>

      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col' colSpan={2}>
              Additions (+ve points to Score)
            </th>
            <th scope='col'>Type</th>
            <th scope='col'>Rate</th>
            <th scope='col'>Count</th>
            <th scope='col'>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{password.length >= 8 ? "✅" : "❔"}</td>
            <td>Number of Characters</td>
            <td>Flat</td>
            <td>+(n*4)</td>
            <td>{password.length}</td>
            <td>{password_length_score(password)}</td>
          </tr>
          <tr>
            <td>{uppercase_letters(password) >= 1 ? "✅" : "❔"}</td>
            <td>Uppercase Letters</td>
            <td>Cond/Incr</td>
            <td>+((len-n)*2)</td>
            <td>{uppercase_letters(password)}</td>
            <td>{uppercase_letters_score(password)}</td>
          </tr>

          <tr>
            <td>{lowercase_letters(password) >= 1 ? "✅" : "❔"}</td>
            <td>Lowercase Letters</td>
            <td>Cond/Incr</td>
            <td>+((len-n)*2)</td>
            <td>{lowercase_letters(password)}</td>
            <td>{lowercase_letters_score(password)}</td>
          </tr>

          <tr>
            <td>{numbers(password) >= 1 ? "✅" : "❔"}</td>
            <td>Numbers</td>
            <td>Cond</td>
            <td>+(n*4)</td>
            <td>{numbers(password)}</td>
            <td>{numbers_score(password)}</td>
          </tr>

          <tr>
            <td>{symbols(password) >= 1 ? "✅" : "❔"}</td>
            <td>Symbols</td>
            <td>Flat</td>
            <td>+(n*6)</td>
            <td>{symbols(password)}</td>
            <td>{symbols_score(password)}</td>
          </tr>
        </tbody>
        
        <thead className='thead-dark'>
          <tr>
            {/* <th scope='col' colSpan='6'>
              Deductions
            </th> */}

            <th scope='col' colSpan={2}>
              Deductions (-ve points to Score)
            </th>
            <th scope='col'>Type</th>
            <th scope='col'>Rate</th>
            <th scope='col'>Count</th>
            <th scope='col'>Score</th>
          </tr>
          <tr>
            <td>{Letters_Only(password) ? "❌" : "✅"}</td>
            <td>Letters Only</td>
            <td>Flat</td>
            <td>-n</td>
            <td>{Letters_Only(password) ? "True" : "False"}</td>
            <td>{Letters_Only_score(password)}</td>
          </tr>

          <tr>
            <td>{Numbers_Only(password) ? "❌" : "✅"}</td>
            <td>Numbers Only</td>
            <td>Flat</td>
            <td>-n</td>
            <td>{Numbers_Only(password) ? "True" : "False"}</td>
            <td>{Numbers_Only_score(password)}</td>
          </tr>

          <tr>
            <td>{consecutive_uppercase(password) > 0 ? "❌" : "✅"}</td>
            <td>Consecutive Uppercase Letters</td>
            <td>Flat</td>
            <td>-(n*2)</td>
            <td>{consecutive_uppercase(password)}</td>
            <td>{consecutive_upper_score(password)}</td>
          </tr>

          <tr>
            <td>{consecutive_lowercase(password) > 0 ? "❌" : "✅"}</td>
            <td>Consecutive Lowercase Letters</td>
            <td>Flat</td>
            <td>-(n*2)</td>
            <td>{consecutive_lowercase(password)}</td>
            <td>{consecutive_lowercase_score(password)}</td>
          </tr>

          <tr>
            <td>{consecutive_numbers(password) > 0 ? "❌" : "✅"}</td>
            <td>Consecutive Numbers</td>
            <td>Flat</td>
            <td>-(n*2)</td>
            <td>{consecutive_numbers(password)}</td>
            <td>{consecutive_numbers_score(password)}</td>
          </tr>

          <tr>
            <td>{lowercase_sequential_count(password) > 0 ? "❌" : "✅"}</td>
            <td>Sequential Letters(3+)</td>
            <td>Fiat</td>
            <td>-(n*2)</td>
            <td>{lowercase_sequential_count(password)}</td>
            <td>{letters_sequential_score(password)}</td>
          </tr>

          <tr>
            <td>{sequential_numbers(password) > 0 ? "❌" : "✅"}</td>
            <td>Sequential Numbers(3+)</td>
            <td>Flat</td>
            <td>-(n*2)</td>
            <td>{sequential_numbers(password)}</td>
            <td>{sequential_numbers_score(password)}</td>
          </tr>

          {/* <tr>
            <td>✅</td>
            <td>Placeholder</td>
            <td>Type</td>
            <td>Rate</td>
            <td></td>
            <td></td>
          </tr> */}
        </thead>
      </table>
    </>
  )
}

export default PasswordMeter
