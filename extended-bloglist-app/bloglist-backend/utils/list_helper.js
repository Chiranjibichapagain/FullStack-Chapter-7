const dummy = (blogs) => {
  return 1;
};

const totalLikes = (posts) => {
  const likes = posts.map((post) => post.likes);
  const sumLikes = likes.reduce((acc, val) => {
    return acc + val;
  }, 0);
  return sumLikes;
};

const posts = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
];

const favoriteBlog = (posts) => {
  const likes = posts.map((post) => post.likes);
  const topLiked = Math.max(...likes);
  const topBlog = posts.filter((post) => post.likes === topLiked);
  return topBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
