// const user = require("../models/user");
const userModel=require("../models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");
// const session = require("express-session");


const register= async (req,res)=>{
    try{
        console.log(req.body.username);
        const existUser= await userModel.findOne({email:req.body.email});
        if(existUser){
            return res.render('register',{msg:"user Already exit"})
        }
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(req.body.password, 10);
        const newUser= await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hasPassword
        })
        console.log(newUser);
        const token=jwt.sign({email:newUser.email,id:newUser._id},"secretkey")
        res.cookie('token',token);
        res.redirect('/login')
    }
    catch(err){
        console.log(err);
    }
   
}
const login=async (req,res)=>{
    let token
    try{
        // console.log(req.body,"login");
        const existUser= await userModel.findOne({email:req.body.email});
        if(!existUser){
           return res.status(404).json({message:"User not Found"});
        }
        const matchPassword= await bcrypt.compare(req.body.password,existUser.password);
        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credential"});
        }
        token=jwt.sign({email:existUser.email,id:existUser._id},"secretkey")
        session=req.session;
        session.tokenLogin=token
        return res.render('auth')
    }
    catch(err){
        console.log(err);
       
        return res.status(500).json({message:"something wrong"});
    }
}

const getData=(req,res)=>{
    console.log(req.userId);
    res.status(200).json({message:"Sucees",id:req.userId})
}
module.exports={register,login,getData}