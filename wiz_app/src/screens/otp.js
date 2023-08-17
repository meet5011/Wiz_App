import OtpInput from 'react-otp-input-2';
import { useEffect, useState } from "react";
import firebase from "./firebase";
import { useNavigate } from 'react-router-dom';

export default function Otp() {

  const [otp, setOtp] = useState("");
  const[verified,setVerfied] = useState(false);
  const navigate = useNavigate();
//  const [number,setNumber] = useState("");
//   const handleChange = (e) =>{
//     setNumber(e.target.value);
//   }
  const handleOtp = (e) =>{
    setOtp(e.target.value)
  }

  const configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
       onSignInSubmit();
        console.log("Recaptcha verified");
      },
      //defaultCountry:"IN"
    });
  }

  const onSignInSubmit = () =>{
   
    const phoneNumber ="+91" + localStorage.getItem("PhoneNumber");
    configureCaptcha();
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
     // console.log(confirmationResult);
      console.log("OTP DONE");
     
      // ...
    }).catch((error) => {
      console.log(error);
      // Error; SMS not sent
      // ...
    });
  }

 useEffect(onSignInSubmit,[]);

  const otpVerify = (e) =>{
    //console.log(window.confirmationResult.confirm(otp));
    e.preventDefault();
    const code = otp;
    console.log(code);
  window.confirmationResult.confirm(otp).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log("OTP Verified");
      setVerfied(true);

      // ...
    }).catch((error) => {
      console.log(error);
      // User couldn't sign in (bad verification code?)
      // ...
    });
    
  }
  return (
    <>
   
    <div id="sign-in-button"></div>
    {/* <input type="number" name="number" placeholder="Phone Number" onChange={handleChange} value={number} />
    <br/>
    <button onClick={onSignInSubmit}>SEND OTP</button><br/> */}
    OTP sent to your Phone Number
    <br/>
    <br/>
    <OtpInput
        containerStyle={{display:"flex",justifyContent:"center"}}
        value={otp}
        onChange={setOtp}
        numInputs={6}
        separator={<span>-</span>}
      />
      <br/>
    <button onClick={otpVerify}>Verify OTP</button>
    {verified && 
    setTimeout(()=>{
      navigate("/login")
    },4000)
    }
    
    </>
  );
}