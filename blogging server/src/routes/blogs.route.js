import express from "express"
import { addBlogs, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blogs.controller.js";

const router = express.Router();

router.post("/addBlogs", addBlogs);
router.get("/getBlogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);



export default router