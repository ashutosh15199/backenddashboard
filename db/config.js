const mongoose = require("mongoose");
const connectToDatabase=async()=>{
    mongoose.connect('mongodb://localhost:27017/e-commerce').then(()=>{
        console.log("db connection success");
    }).catch((e)=>{
        console.log('error connecting to db');
        console.log(e.message);
    });
};
module.exports=connectToDatabase;
