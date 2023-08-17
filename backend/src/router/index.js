const express = require("express");
const router = express.Router();
const loginRoutes = require("./SignUp");

router.use("/api",loginRoutes);

module.exports = router;
