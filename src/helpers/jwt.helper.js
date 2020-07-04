const { sign } = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//funcion generadora de token
module.exports.generateToken = function(user) {
  return sign({ user }, JWT_SECRET, { expiresIn: "4h" });
};
