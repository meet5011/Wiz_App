import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "../screens/signup";
import SignIn from "../screens/signin";
import Home from "../screens/home";
import Otp from "../screens/otp";
import ResponsiveAppBar from "../screens/menu";
import PrimarySearchAppBar from "../screens/menu";
import Search from "../screens/search";


function MyRoute() {
    return ( 
        <BrowserRouter>
        <Routes>
         <Route path="/" element={<SignUp />} />
         <Route exact path="/otp" element={<Otp />} />
         <Route exact path="/login" element={<SignIn />} />
         <Route exact path="/home" element={<PrimarySearchAppBar />} />
         <Route exact path="/search" element={<Search />} />
         
        </Routes>
        </BrowserRouter>
     );
}

export default MyRoute;