const jwt=require("jsonwebtoken");
// const session = require("express-session");
require('dotenv').config()

const auth=(req,res)=>{
    let token=req.session.tokenLogin
    try{
        if(req.session.tokenLogin){
            let user=jwt.verify(token,process.env.Secretkey);
            console.log(user);
            req.userId=user.id;
            return res.status(200).json({message:user})
        }
        else{
            return res.status(401).json({message:" token error"})
        }
    }
    catch(err){
        // console.log((err));
        res.status(401).json({message:"Unauthorize User"})
    }
}
module.exports=auth