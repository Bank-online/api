const bcrypt = require("bcrypt");
const { cryptage, decryptage } = require("./services/function/chifrement");
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  {
    idCard: "20daed58-f675-4a6b-84cc-b0569f26ec24",
  },
  "v6sb89x2Gj33b9dkh"
);
 //console.log(token)
console.log(
  cryptage(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENhcmQiOiIyMGRhZWQ1OC1mNjc1LTRhNmItODRjYy1iMDU2OWYyNmVjMjQiLCJpYXQiOjE2NjkxMjAxNTh9.8njzW5_PYXx8qtzBpebjmyvbyKJNswG1EH21xqZB27A"
  )
);

// console.log(
//   jwt.verify(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENhcmQiOiIyNmNjYjgyNS0zYTNlLTQ2MjMtYmIyYi1kODJhOGVkZjZiZDkiLCJpYXQiOjE2NTI3ODY1NTZ9.OwLD5xcMx8f3YazxAwrmSX6-gpoRfMxXgrGiXMxzOwc",
//     "v6sb89x6s33b9dkh"
//   )
// );
