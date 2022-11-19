const express = require('express');
const { signin, veryfy } = require('../JwtToken/jwt');
const {Admin_ContentwriterModel} = require('../Schema_Model/AdminModel_ContentWriter');
const { BlogModel } = require('../Schema_Model/BlogModel');
const UserControl = express.Router();
UserControl.post('/Login',async(req,res)=>{
    try {
       let {email,password} = req.body;
       let user = await Admin_ContentwriterModel.findOne({email});
       if(user){
           if(user.password===password){
               delete user.password;
              let tocken = signin(user.toJSON());
              res.send({
                status:"success",
                tocken:tocken,
                usertype:user.usertype
               })
           }else{
            res.status(400).send({
                status:"error",
                response:"Wrong password"
               })
           }
       }else{
        res.status(400).send({
            status:"error",
            response:"user not found"
           })
       }
    } catch (error) {
       res.status(500).send({
        status:"error",
        response:"somthing enternaly wrong"
       }) 
    }
})
UserControl.patch('/edituser/:id',async(req,res)=>{
    try {
       let body = req.body;
       let id = req.params.id;
       let user = await Admin_ContentwriterModel.findByIdAndUpdate(id,{...body});
       let newuserdata = await Admin_ContentwriterModel.findById(id);
       let Blogupdatae = {
        user:{
           name:newuserdata.name,
           email:newuserdata.email 
        }
       }
       let blogs = await BlogModel.find({UserId:newuserdata._id});
       for(let i = 0; i<blogs.length; i++){
          await BlogModel.findByIdAndUpdate(blogs[i]._id,{...Blogupdatae});
       }
        res.send({
            status:"success",
             data:newuserdata
        })
    } catch (error) {
       res.status(500).send({
        status:"error",
        response:"somthing enternaly wrong or user Already exist please try another Email"
       }) 
    }
})
UserControl.post('/SignUp',async(req,res)=>{
    try {
       let body = req.body;
       let user = await Admin_ContentwriterModel.create(body);
        delete user.password;
        let token = signin(user.toJSON());
        res.send({
            status:"success",
            response:token,
            usertype:user.usertype
        })
    } catch (error) {
        // console.log(error)
       res.status(500).send({
        status:"error",
        response:"somthing enternaly wrong or user Already exist please try another Email"
       }) 
    }
})
UserControl.post('/TokenLogin',async(req,res)=>{
    try {
       let {jwtToken} = req.body;
       let Userdetail = veryfy(jwtToken);
       if(Userdetail&&Userdetail.err!=="jwt expired"){
           res.send({
            status:"success",
            data:Userdetail
           })
       }else{
        res.send({
            status:"error",
            data:Userdetail
           })
       }
    } catch (error) {
        // console.log(error)
       res.status(500).send({
        status:"error",
        response:"somthing enternaly wrong or user Already exist please try another Email"
       }) 
    }
})
UserControl.get('/allusers',async(req,res)=>{
    try {
        let users = await Admin_ContentwriterModel.find({usertype:"user"});
        res.send({
            status:"success",
            data:users
        })
    } catch (error) {
        res.status(500).send({
            status:"error",
            response:"somthing enternaly wrong"
           })
    }
})
UserControl.delete('/user/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let user = await Admin_ContentwriterModel.findById(id);
        await BlogModel.deleteMany({UserId:user._id});
        await Admin_ContentwriterModel.findByIdAndDelete(id);
        res.send({
            status:"success",
            data:user
        })
    } catch (error) {
        res.status(500).send({
            status:"error",
            response:"somthing enternaly wrong"
           })
    }
})
module.exports = {
    UserControl
}