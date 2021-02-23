import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, TextField } from "@material-ui/core";

import { vote } from '../redux/actions/blogActions'
import {commentBlog} from '../services/blogs'

const BlogView = () => {
  const [comment, setComment] = useState('')
  const dispatch= useDispatch()
  const { blogId } = useParams()
  const allBlogs = useSelector(state => state.blogs)
  const blog = allBlogs.filter(blog => blog.id === blogId)
  
   const handleLikes = () => {
    const changedBlog = blog.map((blog) => {
      return { ...blog, likes: ++blog.likes };
    });
     console.log('test--', changedBlog)
    dispatch(vote(changedBlog[0]))
   };
  
  
  const handleComment = async (id) => {
    try {
      await commentBlog(id, {comment})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Paper variant='elevation' style={{width:'70%', backgroundColor:'lightblue', margin:'10px 0px', padding:'10px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'start'}}>
      <Typography variant='h4' >{blog[0].title}</Typography>
      <a href={blog[0].url} >{ blog[0].url}</a>
      <Typography variant='subtitle1'>
        {`${blog[0].likes} Likes`}
        <IconButton onClick={handleLikes}>
        <FavoriteIcon  color='primary'/>
        </IconButton>
      </Typography>
      <div>
        <Typography variant='h5' color='secondary' >Comments</Typography>
        <div style={{display:'flex', alignItems:'center'}}>
          <TextField value={comment} onChange={(e)=>setComment(e.target.value)} variant='standard' label='Add comment' />
          <Button variant='contained' color='secondary' style={{margin:'20px'}} onClick={()=>handleComment(blog[0].id)} >Add</Button>
        </div>
        <div style={{marginTop:'20px'}}>
          {blog[0].comments.map(comment => (
            <li>{comment}</li>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default BlogView;
