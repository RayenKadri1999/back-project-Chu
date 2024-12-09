
import { errorHandler } from '../utils/error.js';

import User from '../models/Users.js';
import bcrypt from 'bcryptjs';

'use strict';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
//const bcrypt = require('bcrypt');
//const nodemailer = require('nodemailer');
//const User = require('../../models/Users'); 

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

// Assuming you have the necessary imports and setup for your server

export const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user by their ID or any other identifier
    const user = await User.findById(req.user.id); // Assuming you have the user ID in the request

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password provided matches the user's current password
    const validPassword = await bcrypt.compare(currentPassword, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Update the user's password with the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};



export const updateUser = async (req, res, next) => {
 /* if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));*/
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {//we use set because we can update just username for example
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
 /* if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));*/
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    let users;

    if (req.role === 'admin') {
      users = await User.find();
    } else if (req.role === 'superUser') {
      users = await User.find({ role: 'normalUser' }); 
    } else {
      return res.status(403).json({ message: 'Access denied' });
    }

    const sanitizedUsers = users.map(user => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    res.json(sanitizedUsers);
  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
};

export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

 
export const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await UserModel.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id },  process.env.ACCESS_TOKEN_SECRET,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        // roles: authorities,
        accessToken: token
      });

      
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error) {
    next(error);
  }
};


