const express=require("express")
const router=express.Router();
const userController=require("../controller/user")
const authen=require('../middlewares/auth')

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/auth",authen);

module.exports=router;