import React, { useState } from "react";

import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';

const User = ({ user}) => {

  return (
    <Paper variant='elevation' style={{width:'30%', backgroundColor:'lightblue', margin:'10px 0px', padding:'10px 20px', display:'flex', justifyContent:'space-between', alignItems:'start'}}>
      <Typography variant='subtitle1' >{ user.name}</Typography>
      <Typography variant='subtitle1'>{user.blogs.length}</Typography>
    </Paper>
  );
};

export default User;
