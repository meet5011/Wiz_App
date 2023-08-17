import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Rating from '@mui/material/Rating';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PrimarySearchAppBar from "./menu";
import Paper from '@mui/material/Paper';
import "../styles/home.css"


function Home(props) {
    const data= props.data;
    const [expanded, setExpanded] = useState(false);
    const like= props.badge;
    const [wish,setWish] = useState(false);
    const [item,setItem]= useState("");
    const [selected,setSelected] = useState([]);
    

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleLike = (index) =>{
      console.log(index);
      (props.setter({setLike:like+1}));
      setWish(true);
      setItem(index);
      selected.push(data[index]);
      console.log([...selected]);
      
    }

    
     

    

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  
    // const fetchData = async()=>{
    //     return  fetch('https://fakestoreapi.com/products/')
    //     .then(res=>res.json())
    //     .then((json)=>{
    //         console.log(json);
    //         setData(json);
    //     });

    // }

    // useEffect(fetchData,[]);
   
    return ( <>
    {/* <PrimarySearchAppBar data={data} /> */}
   
        <Box sx={{ flexGrow: 1, p:2 }} style={{marginLeft:"55px"}}>
        
      <Grid
        container
        spacing={3}
       // rowSpacing={1}
        sx={{
          '--Grid-borderWidth': '1px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        {data.map((s,index) => (
                   <Card sx={{ maxWidth: 350 }}>
                   <CardHeader
                   style={{fontSize:"10px"}}
                    //  avatar={
                    //    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    //      R
                    //    </Avatar>
                    //  }
                    //  action={
                    //    <IconButton aria-label="settings">
                    //      <MoreVertIcon />
                    //    </IconButton>
                    //  }
                     title={s.title}
                   />
                  
                   <CardMedia
                     component="img"
                     content="fit"
                     image={s.image}
                     alt="Paella dish"
                   />
                   <CardContent>
                     <Typography variant="body2" color="text.secondary" style={{textAlign:"justify"}}>
                      {s.description}
                     </Typography>
                     <br/>
                   PRICE : {s.price}<CurrencyRupeeIcon fontSize="xs"/>
                    
                     <br/>
                     <Rating name="half-rating-read" defaultValue={s.rating.rate} precision={0.5} readOnly />
    
                   </CardContent>
                   Category : {s.category.toUpperCase()}
                   <CardActions disableSpacing>
                    
                     <IconButton aria-label="add to favorites" >
                       <FavoriteIcon onClick={()=>handleLike(index)} key={index} style={index===item ?{color:"red"}:{color:"none"}}  />
                     </IconButton>
                     <IconButton aria-label="share">
                       <ShareIcon />
                     </IconButton>
                     <ExpandMore
                       expand={expanded}
                       onClick={handleExpandClick}
                       aria-expanded={expanded}
                       aria-label="show more"
                     >
                       <ExpandMoreIcon />
                     </ExpandMore>
                   </CardActions>
                   {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                     <CardContent>
                       <Typography paragraph>Method:</Typography>
                       <Typography paragraph>
                         Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                         aside for 10 minutes.
                       </Typography>
                       <Typography paragraph>
                         Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                         medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                         occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                         large plate and set aside, leaving chicken and chorizo in the pan. Add
                         pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                         stirring often until thickened and fragrant, about 10 minutes. Add
                         saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                       </Typography>
                       <Typography paragraph>
                         Add rice and stir very gently to distribute. Top with artichokes and
                         peppers, and cook without stirring, until most of the liquid is absorbed,
                         15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                         mussels, tucking them down into the rice, and cook again without
                         stirring, until mussels have opened and rice is just tender, 5 to 7
                         minutes more. (Discard any mussels that don&apos;t open.)
                       </Typography>
                       <Typography>
                         Set aside off of the heat to let rest for 10 minutes, and then serve.
                       </Typography>
                     </CardContent>
                   </Collapse> */}
                 </Card>
        //   <Grid key={index} {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160} />
         
        ))}
  
      </Grid>
    </Box>
   
       
   
   
    </> );
}

export default Home;




