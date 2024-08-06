// const express = require("express");
// const protect = require("../middleware/authMiddleware");
// const Blog = require("../models/Blog");
// const router = express.Router();

// // Get all blogs (public access)
// router.get("/", protect, async (req, res) => {
//   try {
//     const blogs = await Blog.find();
//     res.json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get a single blog by ID (public access)
// router.get("/:id", protect, async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).json({ message: "Blog not found" });
//     res.json(blog);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new blog (authenticated users only)
// router.post("/", protect, async (req, res) => {
//   const { title, content, author } = req.body;
//   try {
//     const newBlog = new Blog({ title, content, author, user: req.user.id });
//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a blog (authenticated users only)
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

// // Delete a blog (authenticated users only)
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

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// ADDING swagger

// routes/BlogRoutes.js
const express = require("express");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve all blogs
 *     responses:
 *       200:
 *         description: A list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Retrieve a specific blog by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: Blog not found
 */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newBlog = new Blog({
      ...req.body,
      author: req.user.id,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: Blog not found
 *       403:
 *         description: Not authorized
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(blog, req.body);
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the blog to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       403:
 *         description: Not authorized
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
