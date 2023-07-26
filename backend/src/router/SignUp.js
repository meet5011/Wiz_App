const express = require("express");
const db = require("../db/connect");
const CryptoJS = require("crypto-js");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


// get all data from body
// all the data should exists
// check if user already exists
// encrypt the pwd
// save the user in Db
// Generate token

dotenv.config();

router.post("/register",async(req,res)=>{
    console.log(req.body);
    if(!(req.body.fullName
        && req.body.email
         && req.body.password && req.body.phoneNumber
         )){
        res.status(400).send({message:"Please fill all fields"});
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
        const name = req.body.fName;
        const email = req.body.email;
       // const pwd = hash;
        

       
        const findData = await db.collection("users").find({email:email}).toArray();
        console.log(findData);

        // ALL FIELDS COMPULSORY

        // if(!(req.body.name && req.body.email && req.body.password)){
        //     res.status(400).send({message:"Please fill all fields"});
        // }

        // User exist or not
        if(!(req.body.fullName
            && req.body.email
             && req.body.password && req.body.phoneNumber
             )){
            res.status(400).send({message:"Please fill all fields"});
        }
       else if(findData.length > 0){
            console.log("yes");
            res.status(200).send({message:"User already exists"});
           
        }else if(!isValid_Mobile_Number){
            res.status(400).send({message:"Phone number is not valid"});
        }
        else{
        const addRecord = await db.collection("users").insertOne({
            name:req.body.fullName,
            email:email,
            password:jwt.sign(user.password,jwtSecretKey),
            phoneNumber:req.body.phoneNumber
        });
       
        console.log(addRecord);
        res.status(200).send({message:"DATA ADDED"});
    }}catch(e){
        console.log(e);
        console.log("me");
        res.status(400);
    }
    
})

router.post("/login",async(req,res)=>{
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

module.exports = router;