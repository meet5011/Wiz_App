1. Need dependencies
npm init -y

2. add express and mongoose
npm i express mongoose

3. add scripts to run
start : "{file path of root file from where app will start}"

4. make folder structure

5. Require express
const express = require("express")

6. use express functions
const app = express();

7. listen port
app.listen(port,callback)

8. app.get("/",callback which have req & res params)
app.get("/",(req,res)=>{

})

MONGODB

1. Require mongoose
require("mongoose")

2. connect with DB (it will return promise) 
mongoose.connect("conn_string",{objects}).then().catch()

MODULES

1. Make schema


