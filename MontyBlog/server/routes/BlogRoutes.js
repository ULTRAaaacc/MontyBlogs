// // routes/BlogRoutes.js

// const express = require("express");
// const protect = require("../middleware/authMiddleware");
// const Blog = require("../models/Blog");
// const router = express.Router();

// // Get all blogs
// router.get("/", protect, async (req, res) => {
//   try {
//     const blogs = await Blog.find({ user: req.user.id }); // Filter blogs by user
//     res.json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get a single blog by ID
// router.get("/:id", protect, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     if (blog.user.toString() !== req.user.id)
//       return res.status(403).json({ message: "Not authorized" });

//     res.json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new blog
// router.post("/", protect, async (req, res) => {
//   const { title, content, author } = req.body;
//   try {
//     const newBlog = new Blog({ title, content, author, user: req.user.id }); // Include user
//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a blog
// router.put("/:id", protect, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     if (blog.user.toString() !== req.user.id)
//       return res.status(403).json({ message: "Not authorized" });

//     const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json(updatedBlog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a blog
// router.delete("/:id", protect, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     if (blog.user.toString() !== req.user.id)
//       return res.status(403).json({ message: "Not authorized" });

//     await Blog.findByIdAndDelete(req.params.id);
//     res.json({ message: "Blog deleted" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;

// //////////////////////////////////////////////////////
// /////////////////////////////////////////////////////
// //////////////////////////////////////////////////////
// ////////////////////////////////////////////////////

const express = require("express");
const protect = require("../middleware/authMiddleware");
const Blog = require("../models/Blog");
const router = express.Router();

// Get all blogs (public access)
router.get("/", protect, async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single blog by ID (public access)
router.get("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new blog (authenticated users only)
router.post("/", protect, async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = new Blog({ title, content, author, user: req.user.id });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a blog (authenticated users only)
router.put("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog (authenticated users only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
