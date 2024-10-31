import mongoose from "mongoose";
import User from "../models/user.models.js";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import generateTokenAndSaveInCookies from "../jwt/token.js";
const userSchema = z.object({
    email: z.string().email({ message: "invalid email address" }),
    username: z.string().min(3, { message: "username atleast three character long" }),
    password: z.string().min(8, { message: "password atleast eight character long" })
});
const registerUser = async (req, res) => { 
    try {
        
        const { username, email, password } = req.body;
        if (!email || !password || !password) {
            return res.status(400).json({ message: "please provide all required fields" });
        }
        
        const validateUser = userSchema.safeParse({ email, username, password, password });
        if (!validateUser.success) {
            // return res.status(400).json({ errors: validateUser.error.errors });
            const validateUserError = validateUser.error.errors.map(err => err.message);
            return res.status(400).json({ errors: validateUserError });
        }
        const userExist = await User.findOne({ email });
        
        if (userExist) {
            return res.status(400).json({ message: "User already registered" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, email, password:hashPassword });
        
        await newUser.save();
        
        if (newUser) {
          const token= await  generateTokenAndSaveInCookies(newUser._id,res);
            res.status(201).json({ message: "User registered successfully",newUser,token});
        }
    } catch (error) {
        
        res.status(500).json({ message:"error is occuring in registering of user" });
    }
}

const logIn = async (req, res) => {
    
    // implement logic for login
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: "please provide all required fields" });
        }
        const userExist = await User.findOne({ email }).select("+password");
        console.log(userExist);
        
        if (!userExist) {
            return res.status(400).json({ message: "User not Exist" });
        }
        const isMatch = await bcryptjs.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token= await  generateTokenAndSaveInCookies(newUser._id,res);
        res.json({ message: "User logged in successfully", userExist ,token });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "error is occuring in login" });
    }

}

const logOut = async (req, res) => {
    // implement logic for logout
    try {
        // remove token from cookies
        res.clearCookie("jwt", {
            path: "/",
        });
        res.json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "error is occuring in logout" });
    }
 
}

export { registerUser,logIn ,logOut};