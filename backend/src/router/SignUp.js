const express = require("express");
const router = express.Router();
const db = require("../db/connect");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
router.post("/register",async(req,res)=>{
    console.log(req.body.fName);
    if(!( req.body && req.body.fName && req.body.lName
        && req.body.email
         && req.body.password && req.body.phoneNumber
         )){
        res.status(400).json({message:"Please fill all fields"});
    }
    // Javascript program to check
// valid Mobile Number

// Function to validate the
// Mobile Number
function isValid_Mobile_Number(mobile_number) {
    const pattern = /^\d{10}$/;
    return pattern.test(mobile_number);
}

console.log(isValid_Mobile_Number(req.body.phoneNumber) + " number  ");


// This code is contributed by Rahul Chauhan

    try{

      //  const hash = await bcrypt.hashSync(req.body.password,12);
      //  console.log(hash + " Signup");
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const user = req.body;
       // const pwd = hash;
        

       
        const findData = await db.collection("users").find({email:req.body.email}).toArray();
        console.log(findData);

        // ALL FIELDS COMPULSORY

        // if(!(req.body.name && req.body.email && req.body.password)){
        //     res.status(400).json({message:"Please fill all fields"});
        // }

        // User exist or not
        if(!( req.body && req.body.fName && req.body.lName
            && req.body.email
             && req.body.password && req.body.phoneNumber
             )){
            res.status(400).json({message:"Please fill all fields"});
        }
       else if(findData.length > 0){
            console.log("yes");
            res.status(200).json({message:"User already exists"});
           
        }else if(!isValid_Mobile_Number){
            res.status(400).json({message:"Phone number is not valid"});
        }
        else{
            const name = `${req.body.fName} ${req.body.lName}`;
        const addRecord = await db.collection("users").insertOne({
            name:name,
            email:req.body.email,
            password:jwt.sign(user.password,jwtSecretKey),
            phoneNumber:req.body.phoneNumber
        });
       
        console.log(addRecord);
        res.status(200).json({message:"DATA ADDED"});
    }}catch(e){
        console.log(e);
        console.log("me");
        res.status(400);
    }
    
})

router.post("/login",async(req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    // if( !(email && password)){
    //     res.status(201).send("Filled properly")
    // }
    try{
        
        const data = await db.collection("users").find({
            email:req.body.email,
            password: jwt.sign(req.body.password,jwtSecretKey),
        }).toArray();

       console.log(data.email + " before");

        if(!(req.body.email && req.body.password)){
            res.status(400).send({message:"Please fill all fields"});
        }else if(req.body.email !== data[0].email){
            res.status(400).send({message:"email not found"});

        }else{
            res.status(200).send({message:"Data Found"});
        }
        console.log(data);
        
    }catch(e){
        console.log(e);
        res.status(400).send("error occured");
    }
})

router.get("/otp",(req,res)=>{
    try{

    }catch(e){
        console.log(e);
    }
})

module.exports = router;