const express = require("express");
const router = express.Router();

//const protocol = require("prot")


router.get("/", async(req, res) =>{
    var date = new Date();
    
    res.send(date);
}
);





module.exports = router;
