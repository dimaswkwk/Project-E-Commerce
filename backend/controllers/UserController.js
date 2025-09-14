const client = require("../config/database");
const bcrypt = require("bcrypt");
const { accessToken } = require("../utils/jwt")
require("dotenv").config();

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
       const result = await client.query(`SELECT * FROM users where email = $1`, [email]);
        const user = result.rows[0];

       console.log("password input: ", password);
       console.log("password database", user.password)
       console.log("user: ", user);
        if (!user) {
            res.status(401).json({message : "User not found"})
        }
        const validPassword = await bcrypt.compare(password, user.password); // mengecek apakah passwordnya betul atau salah
        if (!validPassword) {
            return res.status(401).json({message:"Invalid Password"})
        }
        const token = accessToken({id: user.id, nama: user.nama, email: user.email, role: user.role});
        res.cookie("token", token, {
            httpOnly: true,
            secure:false,
            sameSite:"lax",
            maxAge: 36000
        });
        res.status(200).json({
            message: "Successfully logged in",
            "data": user,
            "access_token": token
        })
    } catch(err) {
        console.error("login error",err)
        res.status(401).json({message:"Login Error"})
    }
}

const Register = async (req,res) => {

    const {nama, email, password} = req.body

    try {
        const check = await client.query(`SELECT * FROM users WHERE email = $1 OR nama = $2 `, [email, nama]) // Di Check apakah ada user atau email yang sudah digunakan
       if (check.rows.length > 0) {
           return res.status(400).json({message : " user or email already exists"})
       }
       const hashedPassword = await bcrypt.hash(password, 10); // funginya buat meng hash password agar nanti di database tulisan passwordnya encrypted sehingga data aman
        await client.query(`INSERT INTO users (nama, email, password) VALUES ($1,$2,$3)`,[nama, email, hashedPassword])
        res.json({message : "registrasi berhasil! silahkan login"})

    } catch(err) {
        console.error("register error", err)
        res.status(401).json({message: "register error"})
    }
}
const UserMe = async(req,res) => {
    try {
        // ambil id user dari authmiddleware
        const id = req.data.id
        console.log('id', id)
        // query
        const check = await client.query(`SELECT id,nama,email,role from users where id = $1`, [id])
        if (check.rows.length === 0) {
            res.status(401).json({message: "user tidak ditemukan"})
        }
       const dataUser = check.rows[0]
        res.status(200).json(dataUser)
    } catch (err) {
      console.error("error",err);
      res.status(500).json({message: " terjadi kesalahan"})
    }
}
module.exports = { Login, Register, UserMe }