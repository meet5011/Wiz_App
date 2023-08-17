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
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import SimpleSnackbar from '../components/snackbar';
import firebase from "./firebase";
import Otp from './otp';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="###153" href="http://localhost:3000/">
        Wiz App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function SignUp() {

    const [user,setUser] = React.useState({
        fName:"",lName:"",email:"",password:"",phoneNumber:0
    });
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleChange = (e) =>{
        let name, value;

        name = e.target.name;
        value = e.target.value;

        setUser({...user,[name]:value})
    }

    // const configureCaptcha = () =>{
    //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //     'size': 'invisible',
    //     'callback': (response) => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //      onSignInSubmit();
    //       console.log("Recaptcha verified");
    //     },
    //     //defaultCountry:"IN"
    //   });
    // }
  
    // const onSignInSubmit = (e) =>{
    //   e.preventDefault();
     
    //   const phoneNumber ="+91" + user.phoneNumber;
    //   configureCaptcha();
    //   console.log(phoneNumber);
    //   const appVerifier = window.recaptchaVerifier;
    //  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    //   .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //    // console.log(confirmationResult);
    //     console.log("OTP DONE");
       
    //     // ...
    //   }).catch((error) => {
    //     console.log(error);
    //     // Error; SMS not sent
    //     // ...
    //   });
    // }
    

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    
    const { fName, lName, email, password, phoneNumber } = user;

    console.log(user);

    localStorage.setItem("email",email);
    localStorage.setItem("PhoneNumber",phoneNumber);

   return fetch("http://localhost:3001/api/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        fName,lName,
        email,
        password,phoneNumber

      }),
    }).then((res)=> res.json()).then((data)=>{
      console.log(data);
      setMessage(data.message);
     // onSignInSubmit(event);
    }).catch((e)=>{
      console.log(e);
    })

    
  
   };

  return (
    <>
    <div id='sign-in-button'></div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={user.fName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={user.lName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={user.email}
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
                  value={user.password}
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  type="phoneNumber"
                  id="phoneNumber"
                  onChange={handleChange}
                  value={user.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            <Button
              
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {message && <SimpleSnackbar message={message}  />}
      {message ==="DATA ADDED" &&
      setTimeout(() => {
        navigate("/otp");
      }, 3000)
      }
    </ThemeProvider>
    </>
  
   
  );
}