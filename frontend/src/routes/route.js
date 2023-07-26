import { BrowserRouter, Link, Routes } from "react-router-dom";
import SignUp from "../screens/SignUp";

import ("../App.css")
function MyRoute() {

    

    return ( 
    <>
   <Link to="/signup"><button id="home_button"  >Welcome to my app</button></Link> 
   

    </>

     );
}

export default MyRoute;