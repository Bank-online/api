const bcrypt = require("bcrypt");
const { cryptage, decryptage } = require("./services/function/chifrement");
const jwt = require("jsonwebtoken");

// const token = jwt.sign(
//   {
//     idCard: "da7125b8-74b5-4a26-a748-c20dc0960aa8",
//   },
//   "v6sb89x2Gj33b9dkh"
// );
// console.log(token)
console.log(
  cryptage(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENhcmQiOiJkYTcxMjViOC03NGI1LTRhMjYtYTc0OC1jMjBkYzA5NjBhYTgiLCJpYXQiOjE2Njg3Njk0MTB9.bXrSuFgB_AIruYA68IJeh5QJ2EUjjufyYwycUnyqbFI"
  )
);

// console.log(
//   jwt.verify(
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENhcmQiOiIyNmNjYjgyNS0zYTNlLTQ2MjMtYmIyYi1kODJhOGVkZjZiZDkiLCJpYXQiOjE2NTI3ODY1NTZ9.OwLD5xcMx8f3YazxAwrmSX6-gpoRfMxXgrGiXMxzOwc",
//     "v6sb89x6s33b9dkh"
//   )
// );
