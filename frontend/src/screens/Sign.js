import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SimpleSnackbar from '../components/snackbar';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Sign() {

    const [user, setUser] =useState({
        fName: "",
        lName:"",
        fullName:"",
        email: "",
        password: "",
        phoneNumber:""
      });
      const navigate = useNavigate();
      const [message, setMessage] = useState("");
      let name, value;

      const handleClick = () =>{
        navigate("/login");
      }

      const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
    
        setUser({ ...user, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
       // encrypt();
       //    console.log(user);
       // 
        const { fName, lName, email, password ,phoneNumber} = user;
       //let fullName = user.fName + " " + user.lName;
       // user.password = encryptedData;
    
        return fetch("http://localhost:3001/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fName,lName,
            fullName:`${fName} ${lName}`,
             email,
             password,
            phoneNumber
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // if(message === "DATA ADDED"){
            //   setTimeout(() => {
            //   navigate("/login");
            //   }, 1000);
            // }
            setMessage(data.message);
           // <SimpleSnackbar message={message} />
    
            console.log(message);
           
            // if (data.length !== 0) {
            //   setMessage("user already exists");
            // } else {
            //   setMessage("Data added");
              // setTimeout(()=>{
              //   navigate("/login");
              // },500);
            
            // }
          
          
          
          })
          .catch((e) => {
            console.log(e);
          });
    
          
    
      };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

  return (
    <>
    <ThemeProvider theme={defaultTheme}  >
    
      <Container component="main" maxWidth="xs"  >
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fName"
                  value={user.fName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lName"
                  value={user.lName}
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={user.email}
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Mobile number"
                  type="number"
                  id="phone"
                  autoComplete="phone-number"
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              >

              Sign Up
              </Button>
             <Link onClick={handleClick}>Already have an account ?</Link>
            {message && <SimpleSnackbar message={message} />}
            {message == "DATA ADDED" && 
      setTimeout(()=>{
        navigate("/login");
      },1000)
     }
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
      
    </ThemeProvider>
   
    </>
  );
}