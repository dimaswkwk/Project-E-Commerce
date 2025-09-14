const jwt = require("jsonwebtoken")
require("dotenv").config();

const accessToken = (data) => {
     return jwt.sign (
    { id: data.id, nama: data.nama, email: data.email, role: data.role },
     process.env.SECRET_KEY_ACCESS_TOKEN,
    {expiresIn: "1d"}
     )
}
const VerifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
}
module.exports = {VerifyToken,accessToken}