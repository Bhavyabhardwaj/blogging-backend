import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/Users.js"
import dotenv from "dotenv"

const router = Router();

dotenv.config();

router.post("/signup", async(req, res) => {

    const {username, email, password} = req.body;
    
    const existingUser = await User.findOne({email: email})
    
    if(existingUser) {
        return res.status(400).json({message: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({username, email, password: hashedPassword})

    try {
        await newUser.save();
        res.status(201).json({message: "User created successfully"}, newUser)
    } catch (error) {
        console.log("Error in signing up the user", error);
    }
})

router.post("/login", async(req, res) => {

    const {email, password} = req.body;

    const user = await User.findOne({email: email})

    if(!user) {
        return res.status(404).json({message: "User not found"})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect) {
        return res.status(404).json({"Password is wrong"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.status(200).json({token, user})
})

export default router;