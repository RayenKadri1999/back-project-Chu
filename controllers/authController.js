import User from '../models/Users.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import {config} from '../config/auth-config.js'
import nodemailer from 'nodemailer';

const config1 = {
  service: 'gmail',
  auth: {
    user: 'stroketn@gmail.com',
    pass: 'zyyuhgotewtxtsms',
  },
};

const transporter = nodemailer.createTransport(config1);

const sendCredentialsEmail = (username, password, email) => {
  const mailOptions = {
    from: 'stroketn@gmail.com',
    to: email,
    subject: 'Account Credentials',
    html: `<p>Hello ${username},</p><p>Your account has been created successfully. Your username is: ${username} and your password is: ${password}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword, role });

  try {
    await newUser.save();

    // Send account credentials to the new user's email
    sendCredentialsEmail(username, password, email);
console.log("success")
    res.status(201).json('User created successfully!');
  } catch (error) {
    console.log(error)
    next(error);
  }
};


// export const signin = async (req, res, next) => {
//   const  email  = req.body.username;
//   const  password  = req.body.password;
//   try {
//     const validUser = await User.findOne({ email });
//     console.log(validUser);
//     if (!validUser) return next(errorHandler(404, 'User not found!'));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validUser._doc;//don't show the password
//     res
//       .cookie('access_token', token, { httpOnly: true })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };



export const signin = async (req, res, next) => {
  const email  = req.body.username;
  const password = req.body.password;
  
  try {
   
    // Find the user by username
    const user = await User.findOne({email});
    
    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
      
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch =  bcryptjs.compareSync(password, user.password);
    console.log(passwordMatch,password);

    if (passwordMatch) {
     
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id ,  username: user.username, role: user.role,}, process.env.ACCESS_TOKEN_SECRET,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 3600, // 1 hours
                              });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
         roles: user.role,
        accessToken: token
      });

      
 


      
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    
    next(error);
  }
};



export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};