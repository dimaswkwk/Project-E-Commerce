const express = require("express")
const app = express();
const Routes = require("./routes/route");
const cors = require('cors')
const path = require('path');
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/api', Routes)

app.use("/uploads", express.static(path.join(__dirname,'/uploads')));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

