// const jwt = require("jsonwebtoken");
// const User = require('../Modals/user');

// const Authenticate = async (req, res, next) => {
//     try {   

//         const token = req.cookies.jwtoken;
//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//         console.log(verifyToken, 'verifyToken');
//         const rootUser = await User.findOne({_id:verifyToken._id});

//         if(!rootUser){throw new Error('user not found')}

//         req.token = token;
//         req.rootUser= rootUser;
//         req.userId = rootUser._id;
//         req.isLoggedIn = true;
//         // console.log(rootUser, 'rootUser')
//         // console.log(req.rootUser, 'req.rootUser')
//         // console.log(req.token, 'req.token')
//         console.log(rootUser.id, 'rootUser.id')
//         console.log(req.userId, 'req.userId')
//         next();


//     }catch(err){
//         req.isLoggedIn = false; // Set the isLoggedIn flag to false
//         res.status(401).send('Unauthorized:No token provided');
//         console.log(err);
//     }   
// }

// module.exports = Authenticate;
const jwt = require("jsonwebtoken");
const User = require('../Modals/user');

const Authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(token, 'zuth token')
    if (!token) {
      req.isLoggedIn = false; // Set the isLoggedIn flag to false
    //   return res.status(401).send('Unauthorized: No token provided');
      return res.status(401).json({ success:false,error: 'Unauthorized: No token provided' });
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken, 'verifyToken');
    const rootUser = await User.findOne({ _id: verifyToken._id });

    if (!rootUser) {
      req.isLoggedIn = false; // Set the isLoggedIn flag to false
      throw new Error('User not found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    req.isLoggedIn = true;
    console.log(rootUser.id, 'rootUser.id');
    console.log(req.userId, 'req.userId');
    next();
  } catch (err) {
    req.isLoggedIn = false; // Set the isLoggedIn flag to false
    // res.status(401).send('Unauthorized: Invalid token');
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    console.log(err);
  }
}

module.exports = Authenticate;
