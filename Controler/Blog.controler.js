const express = require('express');
const {Admin_ContentwriterModel} = require('../Schema_Model/AdminModel_ContentWriter');
const { BlogModel } = require('../Schema_Model/BlogModel');
const BlogControler = express.Router();
BlogControler.post('/blogs/:id',async(req,res)=>{
    try {
        let body = req.body;
        let id = req.params.id;
        let user = await Admin_ContentwriterModel.findById(id);
        body.UserId = user._id;
        body.user = {
            name:user.name,
            email:user.email
        }
       let Blog = await BlogModel.create(body);
       res.send({
        status:"success",
        data:Blog
       })
    } catch (error) {
         res.status(500).send({
            status:"error",
            response:"somthing enternaly went wrong"
           }) 
    }
})
BlogControler.get('/blogs/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let user = await Admin_ContentwriterModel.findById(id);
        let AprovedBlogs = await BlogModel.find({UserId:user._id,approved:"yes"});
        let NotApprovedblogs = await BlogModel.find({UserId:user._id,approved:"no"});
        res.send({
            status:"success",
            data:{
                AprovedBlogs,
                NotApprovedblogs
            }
        })
    } catch (error) {
         res.status(500).send({
            status:"error",
            response:"somthing enternaly went wrong"
           }) 
    }
})
BlogControler.patch('/blogs/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let body = req.body;
        let blog = await BlogModel.findByIdAndUpdate(id,{...body});
        
        res.send({
            status:"success",
            data:blog
        })

    } catch (error) {
         res.status(500).send({
            status:"error",
            response:"somthing enternaly went wrong"
           }) 
    }
})
BlogControler.get('/Allblogs',async(req,res)=>{
    try {
        let AprovedBlogs = await BlogModel.find({approved:"yes"});
        let NotApprovedblogs = await BlogModel.find({approved:"no"});
        res.send({
            status:"success",
            data:{
                AprovedBlogs,
                NotApprovedblogs
            }
        })
    } catch (error) {
         res.status(500).send({
            status:"error",
            response:"somthing enternaly went wrong"
           }) 
    }
})
BlogControler.get('/blog/:id',async(req,res)=>{
    try {
        let id = req.params.id
        // console.log(id)
        let blog = await BlogModel.findById(id);
        res.send({
            status:"success",
            data:blog
        })
    } catch (error) {
        // console.log(error)
         res.status(500).send({
            status:"error",
            response:"somthing enternaly went wrong"
           }) 
    }
})
BlogControler.delete('/blog/:id',async(req,res)=>{
    try {
        let id = req.params.id
        let blog = await BlogModel.findByIdAndDelete(id);
        res.send({
            status:"success",
            data:blog
        })
    } catch (error) {
         res.status(500).send({
            status:"error",
            response:"somthing enternaly went wrong"
           }) 
    }
})
module.exports  = {
    BlogControler
}