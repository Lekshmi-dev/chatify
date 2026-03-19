
import {generateToken} from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async(req, res) => {
    const {fullName,email,password} =req.body;
    try{
        if(!fullName || !email || !password) {
             return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters long"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Please enter a valid email address"});
        }
        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email already in use"});
        }
        const salt = await bcrypt.genSalt(10);
        const hasedpassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            fullName,
            email,
            password:hasedpassword,
        });
        if(newUser){   
            const savedUser = await newUser.save();
            generateToken(newUser._id);     
            await newUser.save();
            //send email to user
            try{
                    await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
            }catch(error){
                console.log("Error sending welcome email:", error);
            }

           return res.status(201).json({_id:newUser._id, fullName:newUser.fullName, email:newUser.email, profilepicture:newUser.profilepicture,message:"User created successfully"}); 
        }else{ 
            return res.status(400).json({message:"Inavalid User data"});
       }
  
    }catch(error){
        console.log("error in signup", error);
        return res.status(500).json({message:"Internal Server error"});
    }

}

export const login= async(req,res)=>{
    const {email,password} =req.body;
    try{
        if(!email || !password){
            return res.status(400).message("All fields are required");
        }
        const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    
        if(!emailRegex.test(email)){
            return res.status(400).message("Invalid Email Id");
        }
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentials"});
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid Credentials"})
            generateToken(user._id,res);
            res.status(200).json({
                _id:user._id,
                email:user.email,
                fullName:user.fullName,
                profilepicture:user.profilepicture
            });
    }catch(err){
        console.log("Error in login",err);
        return res.status(500).json({message:"Internal server Error"})
    }
}
export const logout =async(req,res)=>{
 res.cookie("jwt","",{maxAge:0});
 return res.status(200).json({"message":"Logged out successfully"})
}