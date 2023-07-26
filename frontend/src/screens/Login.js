import { useState } from "react";
import SimpleSnackbar from "../components/snackbar";
import { useNavigate } from "react-router-dom";

//import ("../styles/home.css");

function Login() {


    const [user,setUser] = useState({
        email:"",
        password:""
    });
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    

    let name, value;

    const handleChange = (e) =>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value});
    };
    

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log(user);

        const {email,password} = user;

        return fetch("http://localhost:3001/api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
               email,
               password
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            setMessage(data.message);
        }).catch(e=>{
            console.log(e);
        })
    }



    return ( <>
    
    <form id="sign_form">
        <h1>Login</h1>
        <br />
        <label>Email: </label>
        <input
          onChange={handleChange}
          name="email"
          value={user.email}
          required
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={user.password}
        />
        <br />
       <button type="submit" onClick={handleSubmit}>submit </button>
      </form>
      {message && <SimpleSnackbar  message={message}/>} 
      {message == "Data Found" && 
      setTimeout(()=>{
        navigate("/home");
      },1000)
     }
    
    </> );
}

export default Login;