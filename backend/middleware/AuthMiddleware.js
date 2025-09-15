const {VerifyToken} = require("../utils/jwt");
require('dotenv').config();

const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'token tidak ditemukan'});
    }
    try {
    const decoded = VerifyToken(token);
    //tambahkan data pengguna (dari token) ke objek request biar bisa dipanggil
    req.data ={
        id: decoded.id,
        role: decoded.role
    };
    next();
    } catch (err) {
        return res.status(401).json({message: 'token tidak ditemukan'});
    }
}
module.exports = authMiddleware