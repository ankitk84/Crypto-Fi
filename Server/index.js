const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
app.use(cookieParser ());
const session = require('express-session');
app.use((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "");
    // res.setHeader(
    //     "Access-Control-Allow-Methods",
    //     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    // );
    //  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000','https://main--crypto-fi.netlify.app',"https://crypto-fi.onrender.com");
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
});
app.use(express.json())

require('dotenv').config()

//setup database
require("./DB/connection");

//setup modal
require("./Modals/user")
require("./Modals/Portfolio")
require("./Modals/OrderBook")

app.use(
  session({
    secret: "env.SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: "none",
    },
    rolling: true,

  })
  );

app.use(
    cors({
     origin: [
        "http://localhost:3000",
        "https://main--crypto-fi.netlify.app",
        "https://crypto-fi.onrender.com"
        
      ],
      credentials: true,
    })
  );

  // cors({
  //   origin: [
      
  //   ],

//setup routes
app.use(require("./Routes/auth"));
app.use(require("./Routes/userDetails"));
app.get('/',(req,res)=>{
  res.send("hello")
}
)


const PORT = process.env.PORT || 8000



app.listen(PORT,()=>{
    console.log("CONNECTED TO SERVER")
    console.log(`Server is running on port ${PORT}`)
}
)

