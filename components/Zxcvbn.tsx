import React, { useState, useEffect } from "react"
import zxcvbn from "zxcvbn"
import frequency_lists from "./zxcvbn/frequency_lists"
import sequences from "./zxcvbn/sequences"

export const Zxcvbn = (
  { password }: { password: string }
) => {
  console.log({ password })
  var evaluation = zxcvbn(password)
  var common_words_array: Array<string> = []
  const [common_words, set_common_words] = useState("")
  const [date_found, set_date_found] = useState(false)
  const [sequence_found, set_sequence_found] = useState(false)

  useEffect(() => {
    for (let category in frequency_lists) {
      for (let word of frequency_lists[category]) {
        if (password.includes(word)) {
          common_words_array.push(word)
        }
      }
    }
    set_common_words(common_words_array.toString())
    console.log("Common words", common_words)
  }, [password])

  // check for dates
  useEffect(() => {
    //this regex checks for format ddmmyyyy
    let ddmmyyyy = /[0-3]\d[0-1][0-2][1-2]\d\d\d/g.test(password)
    //this regex checks for format dd-mm-yyyy
    let dd_mm_yyyy = /[0-3]\d-[0-1][0-2]-[1-2]\d\d\d/g.test(password)
    //this regex checks for format mmddyyyy
    let mmddyyyy = /[0-1][0-2][0-3]\d[1-2]\d\d\d/g.test(password)
    //this regex checks for format mm-dd-yyyy
    let mm_dd_yyyy = /[0-1][0-2]-[0-3]\d-[1-2]\d\d\d/g.test(password)
    //this regex checks for format yyyymmdd
    let yyyymmdd = /[1-2]\d\d\d[0-1][0-2][0-3]\d/g.test(password)
    //this regex checks for format yyyy-mm-dd
    let yyyy_mm_dd = /[1-2]\d\d\d-[0-1]-[0-2][0-3]\d/g.test(password)

    if (
      ddmmyyyy ||
      dd_mm_yyyy ||
      mmddyyyy ||
      mm_dd_yyyy ||
      yyyymmdd ||
      yyyy_mm_dd
    ) {
      set_date_found(true)
      console.log("REGEX", true)
    } else {
      set_date_found(false)
      console.log("REGEX", false)
    }
  }, [password])

  // check for sequential or repeated numbers/alphabet
  useEffect(() => {
    let flag = false
    for (let word of sequences) {
      if (password.includes(word)) {
        flag = true
      }
    }
    set_sequence_found(flag)
    console.log("SEQUEN", sequence_found)
  }, [password])

  return (
    <div>
      <h3 className='text-center my-2'>zxcvbn Algorithm</h3>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>Processing Speed</th>
            <th>Time to Crack</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Online with Throttling
              <br />
              (100 per hour)
            </td>
            <td>
              {evaluation.crack_times_display.online_throttling_100_per_hour}
            </td>
          </tr>
          <tr>
            <td>
              Online without Throttling
              <br />
              (10 per second)
            </td>
            <td>
              {
                evaluation.crack_times_display
                  .online_no_throttling_10_per_second
              }
            </td>
          </tr>
          <tr>
            <td>
              Offline Slow Hashing
              <br />
              (10,000 per second)
            </td>
            <td>
              {
                evaluation.crack_times_display
                  .offline_slow_hashing_1e4_per_second
              }
            </td>
          </tr>
          <tr>
            <td>
              Offline Fast Hashing
              <br />
              (10,000,000,000 per second)
            </td>
            <td>
              {
                evaluation.crack_times_display
                  .offline_fast_hashing_1e10_per_second
              }
            </td>
          </tr>
        </tbody>
      </table>

      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th style={{ width: "50%" }}>zxcvbn Evaluation</th>
            <th style={{ width: "50%" }}>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>zxcvbn Score</td>
            <td>{evaluation.score} (out of 4)</td>
          </tr>
          <tr>
            <td>Warnings</td>
            <td>{evaluation.feedback.warning}</td>
          </tr>
          {evaluation.feedback.suggestions.map((suggestion, index) => {
            return (
              <tr>
                <td>Suggestion {index + 1}</td>
                <td>{suggestion}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>Evaluation Method</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Date Found?</td>
            <td>{date_found.toString()}</td>
          </tr>

          <tr>
            <td>Sequence Found?</td>
            <td>{sequence_found ? "true" : "false"}</td>
          </tr>
          {common_words.split(",").map((word, index) => {
            return (
              <tr>
                <td>Common Word {index + 1}</td>
                <td>{word}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Zxcvbn
