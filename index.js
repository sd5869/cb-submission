/**
 * Created by umair on 16/12/16.
 */

let Request = require("request"),
    base64 = require("base-64"),
    R = require("ramda"),
    util = require("./util/util.js")

const URL = util.requireFromEnvironment("JUDGE_API_URL")
const ACCESS_TOKEN = util.requireFromEnvironment("JUDGE_API_ACCESS_TOKEN")

module.exports = {
  judge: (lang, source, test_count, testcases, expected, get_output, callback) => {
    let form_data = {
      lang: lang,
      source: base64.encode(source),
      test_count: test_count,
      input: R.map(base64.encode, testcases),
      expected_output: R.map(base64.encode, expected),
      get_output: get_output
    }

    Request({
      uri: `${URL}submission`,
      method: "POST",
      form: form_data,
      headers: {
        "access-token": ACCESS_TOKEN
      }
    }, (error, response, body) => {
      if (error) console.error(error)
      console.log(body)
      callback(JSON.parse(body))
    })
  }
}
