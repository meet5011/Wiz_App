const express = require("express");
const router = express.Router();
const loginRoutes = require("./SignUp");

//const protocol = require("prot")

router.use("/api",loginRoutes);
router.get("/", async(req, res) =>{
    var date = new Date();
    
    res.send(date);
}
);

module.exports = router;





module.exports = router;
