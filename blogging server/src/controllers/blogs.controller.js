import Blog from "../models/blogs.model.js";
import User from "../models/users.model.js";

const addBlogs = async (req, res) => {
    const { title, description, blogUser } = req.body;

    try {
        const user = await User.findById(blogUser);
        if (!user) return res.status(404).json({ message: "User not found" });

        const blog = new Blog({ title, description, blogUser });
        const savedBlog = await blog.save();

        user.userBlogs.push(savedBlog._id);
        await user.save();

        res.status(201).json({ message: "Blog created successfully", blog: savedBlog });
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
};


const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("blogUser", "username email");
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};



 const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id).populate("blogUser", "username email");
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blog", error });
    }
};



const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const blog = await Blog.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        res.status(200).json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ message: "Error updating blog", error });
    }
};



 const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        await User.findByIdAndUpdate(blog.blogUser, {
            $pull: { userBlogs: blog._id },
        });

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting blog", error });
    }
};


export { addBlogs ,getAllBlogs , getBlogById , updateBlog , deleteBlog }

