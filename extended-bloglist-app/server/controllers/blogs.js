const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .then((blogs) => {
      response.json(blogs);
    });
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    const token = middleware.tokenExtractor(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!(token || decodedToken)) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id,
    };
    const blog = new Blog(newBlog);
    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.json(await Blog.find({}));
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const token = middleware.tokenExtractor(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!(token || decodedToken)) {
      return res.status(401).json({ error: "token missing or invalid" });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments:[]
  };
  await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote.toJSON());
    })
    .catch((error) => next(error));
});


blogsRouter.post("/:id/comments", async(req, res) => {
  const { id } = req.params
  const { comment } = req.body
  console.log('test', req.body)
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(401).json({error:'Blog not found'})
  }
  const blogComments=blog.comments
  blogComments.push(comment)

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: blogComments
  }

  await Blog.findByIdAndUpdate(id, newBlog, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote.toJSON());
    })
    .catch((error) => next(error));

})

module.exports = blogsRouter;
