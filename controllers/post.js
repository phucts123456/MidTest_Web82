const postModel = require("../models/post");
const userModel = require('../models/user');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    const apiKey = req.query.apiKey;
    console.log(apiKey)
        if(apiKey) {
            console.log(apiKey)
            const userInfo = await getUserInfo(apiKey);
            const userId = userInfo._id;
            const content = req.body.content;
            const newPost = {
                userId: userId,
                content: content,
            }
            postModel.create(newPost);
            res.status(200).send({
                message:"Create post success",
                data:newPost
            })
        }
        else {
            res.status(400).send({
                message:"Must have api key"
            })
        }     
    }
    const getUserInfo = async (apiKey) => {
        const myArray = apiKey.split("-$");
        let userId = myArray[1].replace("$","");
        return await userModel.findById(userId).exec();
    }
    const updatePost = async (req, res) => {
        const apiKey = req.query.apiKey;
        if(apiKey) {
        const userInfo = await getUserInfo(apiKey);
        if(userInfo) {
            var postId = req.params.id;
            const isValidObjectId = mongoose.isValidObjectId(postId)
            const post = isValidObjectId 
                ? await postModel.findById({_id: postId}) 
                : null;
            if(post) {
                const userId = userInfo._id;
                const content = req.body.content;
                const updatePost = {
                    _id: postId,
                    userId: userId,
                    content: content,
                }
                await postModel.updateOne({_id:postId}, updatePost);
                res.status(200).send({
                    message:"Update post success",
                    data: updatePost
                })
            }
            else {
                res.status(400).send({
                    message:"Not found post"
                })
            }
        }
        else{
            res.status(400).send({
                message:"apiKey not valid"
            })
        }
    }
    else 
    {
        res.status(400).send({
            message:"Must have api key"
        }) 
    }
}

module.exports = {
    createPost,
    updatePost
}