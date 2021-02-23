import React from "react";
import {Link} from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { IconButton } from "@material-ui/core";

const Blog = ({ blog, handleDelete }) => {

  return (
    <Paper variant='elevation' style={{width:'30%', backgroundColor:'lightblue', margin:'10px 0px', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'start'}}>
      <IconButton onClick={handleDelete} >
      <DeleteIcon color='error' />
      </IconButton>
      <Link to={`/blog/${blog.id}`}>
      <Typography variant='subtitle1' >{ blog.title}</Typography>
      </Link>
      <Typography variant='subtitle1'>{blog.author}</Typography>
    </Paper>
  );
};

export default Blog;
