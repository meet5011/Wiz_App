import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SimpleSnackbar from "../components/snackbar";
//import ("../styles/home.css");

function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const[encryptedData,setEncryptedData] = useState("");
  const[decryptedData,setDecryptedData] = useState("");
  let name, value;

  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
//   const secret_pass = "secret123"

//   const encrypt = ()=>{
//     const data = CryptoJS.AES.encrypt(
//         JSON.stringify(user.password),
//         secret_pass
//     ).toString();
//        user.password = data;
//        setUser({...user});
//   }

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
    const { name, email, password } = user;
   // user.password = encryptedData;

    return fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
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

  return (
    <>
      <form id="sign_form">
        <h1>Signup</h1>
        <label>Name: </label>
        <input onChange={handleChange} name="name" value={user.name} />
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
       <button type="submit" onClick={handleSubmit}>submit </button> <br/>
       <Link to="/login">Already have an account ?</Link>
      </form>
     
     {message && <SimpleSnackbar message={message} /> }
     {message == "DATA ADDED" && 
      setTimeout(()=>{
        navigate("/login");
      },1000)
     }
    </>
  );
}

export default SignUp;
