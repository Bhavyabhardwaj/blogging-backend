import { Router } from "express";
import Post from "../models/Post";
import authMiddleware from "../middlewares/authmiddleware";

const router = Router();

router.post("/", authMiddleware, async(req, res) => {
    const {title, content} = req.body;
    const newPost = await Post.create({title, content, author: req.user.id})
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in creating ppost", error);
    }
})

router.get("/", async(req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username')
        res.json(posts);
    } catch (error) {
        
    }

})


export default router;