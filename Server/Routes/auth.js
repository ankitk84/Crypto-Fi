const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const cookie = require('cookie-parser')
const Portfolio = require("../Modals/Portfolio");
const OrderBook = require("../Modals/OrderBook");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
// const crypto = require('crypto'); 
const requiredLogin = require("../middleware/requireLogin")
const Authenticate = require("../middleware/authenticate")
const bodyParser = require("body-parser"); router.use(bodyParser.json());

router.post("/signup", (req, res) => {

    
    const { name, email, password,cpassword } = req.body
    if (!email || !password || !name || !cpassword) {
        return res.status(422).json({ error: "Please add all the fields" })
    }

    User.findOne({ email: email }).then((userexist) => {
        if (userexist) {
            return res.status(422).json({ error: "user already exists with that email" })
        }
        else if(password!=cpassword){
            return res.status(422).json({ error: "passwords do not match" })
        }

        bcrypt.hash(password, 12).then(hashedpassword => {
            console.log(hashedpassword)
            const user = new User({
                email,
                password: hashedpassword,
                name,
            })
            user.save().then(user => {
                res.status(201).json({ message: "Successfully saved" })
                Portfolio.create({ userId: user._id })
                
            }).catch(err => {
                console.log(err)
                // res.status(500).json({ error: "Failed to register" });
            })
        })

    }).catch(err => {
        console.log(err)
    })
})

router.post("/signin", async (req, res) => {

    try {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ error: "Please add email or password" })
    }
    const userexist = await User.findOne({ email: email });

    if (userexist) {
        const isMatch = await bcrypt.compare(password, userexist.password);
        const token = await userexist.generateAuthToken();
        console.log(token);

        
        if (!isMatch) {
            res.status(422).json({ error: "Invalid email or password" })
        }else{

            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+259200000),
                httpOnly:true,
                // credentials:'include',
                secure:true,
            });
            res.json({message:"Successfully signed in"})}
        } else {
            res.status(422).json({ error: "Invalid email or password" })
        }
    } catch (err) {
        console.log(err) //ok
    }




    // if (rooms) {
    //     User.findOneAndUpdate({ email: email }, {
           
    //     }, {
    //         new: true
    //     }).then(savedUser => {
    //         if (!savedUser) {
    //             res.status(422).json({ error: "Invalid email or password" })
    //         }
    //         bcrypt.compare(password, savedUser.password).then(doMatch => {
    //             if (doMatch) {
    //                 //res.json({message:"Successfully signed in"})
    //                 const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET)
    //                 const { _id, name, email, rooms } = savedUser
    //                 res.json({ token, user: { _id, name, email } })
    //             }
    //             else {
    //                 return res.status(422).json({ error: "Invalid Email or password" })
    //             }
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
    // else {
    //     User.findOne({ email: email }).then(savedUser => {
    //         if (!savedUser) {
    //             res.status(422).json({ error: "Invalid email or password" })
    //         }
    //         bcrypt.compare(password, savedUser.password).then(doMatch => {
    //             if (doMatch) {
    //                 // res.json({ message: "Successfully signed in" })
    //                 const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET)
    //                 const { _id, name, email } = savedUser
    //                 res.json({ token, user: { _id, name, email} })
    //             }
    //             else {
    //                 return res.status(422).json({ error: "Invalid Email or password" })
    //             }
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }
});

router.post("/verifyotp",(req,res)=>{
    if(!req.body.email)
    return res.status(400).json({"error":"error"})
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `teamsclonemicrosoft@gmail.com`,
        pass: process.env.emailPassword
      }
    });
    var otp = Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9)+""+Math.floor(Math.random()*9);
    var mailOptions = {
      from: {name:"Teams Microsoft",address:'teamsclonemicrosoft@gmail.com'},
      to: req.body.email,
      subject: 'Verify your Email ID',
      html: `<h1>Microsoft Teams Clone</h1>
      <p>Here's your One time password (otp) : ${otp}</p>
      `
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.json({"error":"Error occurred"})
      } else {
        console.log('Email sent: ' + info.response);
        const hash = crypto.createHash('sha256').update(otp).digest('hex'); 
        // const token=jwt.sign({hash:hash,email:req.body.email},process.env.JWT_FORGOT_PASSWORD,{expiresIn: '10min'})
        
        return res.json({hash:hash})
      }
    });
})

router.post("/forgotpassword",(req,res)=>{
    const { email, password} = req.body
    if (!email || !password) {
        res.status(422).json({ error: "Please add email or password" })
    }
    bcrypt.hash(password, 12).then(hashedpassword =>
    User.findOneAndUpdate({email},{
        password : hashedpassword
    }).then(user=>{
        if (!user) {
            return res.status(422).json({ error: "user does not exists" })
        }
        res.json({message:"Success"})
    })
    )
}
)


router.get("/about",Authenticate,(req,res)=>{
    // console.log("about page working");
    res.send(req.rootUser);
});




// res.send(req.rootUser);
    

router.use(cookie());
router.get("/logout",  (req, res) => {
    console.log("logout page working");
    // res.clearCookie('jwtToken', { path: "/" });
    // res.status(200).json({ success: false });
    // req.rootUser= null;
    // req.token=token;
    // console.log(token, 'token')
    res.clearCookie("jwtoken", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    res.status(200).json({ success: true });
    

  });

  router.get("/checkstatus",Authenticate,(req,res)=>{
    console.log("getdata page working");

    // res.send(req.rootUser);
    // res.send(req.isLoggedIn);
    // console.log(req.isLoggedIn)
    if (req.isLoggedIn) {
      // User is logged in, continue with the dashboard logic
      console.log(req.isLoggedIn);
      res.json({ data: true });
    } else {
      // User is not logged in, redirect to login page or show error message
      console.log(req.isLoggedIn);
      // res.json({ data: false });
      return res.status(401).json({ success: false });
    }
});

  router.get('/portfolio',  Authenticate, async (req, res) => {
    try {
        // const { userId} = req.userId;
        // console.log(userId, 'userId')
        const userId = req.userId;
        // console.log(userId, 'userId')
      const user = await Portfolio.findOne({ userId: userId });
      console.log(user, 'portfolio')
      if (!user) {
        console.log('not found')
        return res.status(404).json({ success: false, message: 'User portfolio not found' });
      }
      console.log(user, 'data')
    //   // Send the portfolio data as the response
    //   res.status(200).json({ success: true, data: user.Portfolio });
    res.status(200).json({ success: true, data: user });
    //   res.send(user);
    } catch (err) {
        console.log(err, 'error')
      res.status(401).json({ success: false, message: err.message });
    }
    // res.send(req.rootUser);
  });


  router.get('/orderbook',Authenticate, async (req, res) => {
    try {
        const userId = req.userId;
      const orders = await OrderBook.find({ userId: userId });
      // Send the order book data as the response
      res.status(200).json({ success: true, data: orders });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });


module.exports = router