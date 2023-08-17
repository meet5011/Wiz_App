import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
import Woman2Icon from '@mui/icons-material/Woman2';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import { Link, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SwipeableTemporaryDrawer(props) {
  const data = props.data;
  const navigate = useNavigate();
  const filtered = data.map((item,index)=>{
    return item.category;
  });
  const [categoryData,setCategoryData] = useState([]);

  
  const categories = [...new Set(filtered)];

  const handleCategory = (index) =>{
    
    console.log(categories[index].toUpperCase());
   const categoryFiltered =  data.filter((item)=>{
      return item.category === categories[index];
    })

    
    props.categorySetter({categoryData:categoryFiltered});

  }

  
 
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const categoryIcons = [
    <CheckroomIcon />,
    <DiamondOutlinedIcon />,
    <SpeakerOutlinedIcon />,
    <Woman2Icon />
]

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <h2 style={{marginLeft:"15px"}}>Shop By Category</h2>
      <List>
        {categories.map((text, index) => (
          <ListItem key={index} disablePadding>
           
           <Link key={index}  onClick={()=>handleCategory(index)}> 
           <ListItemButton   >
              <ListItemIcon >
              
               {categoryIcons[index]}
           
          
              </ListItemIcon>
             
           {text}
            </ListItemButton>
            </Link> 
          </ListItem>
        ))}
      </List>
      <h2 style={{marginLeft:"15px"}}>Price Range</h2>
    </Box>
  );

  return (
    <div>
      {  ['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{color:"white"}} onClick={toggleDrawer(anchor, true)}><MenuIcon fontSize='large' /></Button>
          <SwipeableDrawer
            anchor={'left'}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}