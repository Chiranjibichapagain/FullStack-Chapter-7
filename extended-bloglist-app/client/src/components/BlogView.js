import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import {vote} from '../redux/actions/blogActions'
import Paper from '@material-ui/core/Paper';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, TextField } from "@material-ui/core";

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
      await axios.post(`/api/blogs/${id}/comments`, comment)
    } catch (error) {
      console.log(error)
    }
  }

  console.log('test-comm', comment)
  return (
    <Paper variant='elevation' style={{width:'70%', backgroundColor:'lightblue', margin:'10px 0px', padding:'10px 20px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'start'}}>
      <Typography variant='h4' >{blog[0].title}</Typography>
      <a>{ blog[0].url}</a>
      <Typography variant='subtitle1'>
        {`${blog[0].likes} Likes`}
        <IconButton onClick={handleLikes}>
        <FavoriteIcon  color='primary'/>
        </IconButton>
      </Typography>
      <div>
        <Typography variant='h5' color='secondary' >Comments</Typography>
        <div>
          <TextField value={comment} onChange={(e)=>setComment(e.target.value)} variant='standard' label='Add comment' />
          <Button onClick={()=>handleComment(blog[0].id)} >Add</Button>
        </div>
        <div>
          {blog[0].comments.map(comment => (
            <li>{comment}</li>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default BlogView;
