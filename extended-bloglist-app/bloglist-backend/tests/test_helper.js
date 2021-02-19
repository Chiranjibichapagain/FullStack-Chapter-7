const Blog = require("../models/blog.js");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "title 1",
    author: "author 1",
    url: "firstexample.com",
    likes: 122,
  },
  {
    title: "title 2",
    author: "author 2",
    url: "secondexample.com",
    likes: 123,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  // gets notes in database
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
