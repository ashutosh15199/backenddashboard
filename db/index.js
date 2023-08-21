const express = require("express");
const mongoose = require('mongoose');
const ObjectId= mongoose.Types.ObjectId;
const cors = require('cors');
const connectToDatabase=require("./config.js");
const User = require("./user.js");
const Product = require('./product.js');
const app = express();
app.use(express.json());
app.use(cors());
app.post("/register",async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  const result = await user.save();
  const data=result.toObject();
  delete data.password;
    res.send(data); 
  });
  app.post('/login',async(req, res)=>{
    console.log(req.body);
   
      let user =await User.findOne(req.body).select('-password');
       res.send(user); 
  });
  app.post('/add-product',async(req, res)=>{
    console.log(req.body);
    let product = new Product(req.body);
    let result =await product.save();
    res.send(result);
  });
  app.get('/products',async(req, res)=>{
   let products=await Product.find();
   if(products.length>0){
    res.send(products);
   }else{
    res.send("No Products");
   }
  });
  app.delete('/product/:id',async(req,res)=>{
    console.log(req.params.id);
    const result =await Product.deleteOne({_id:new ObjectId(req.params.id)});
   
    res.send(result);
  });
  app.get('/product/:id',async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
      res.send(result);
    }else{
      res.send("no result found");
    }
  });
  app.put('/product/:id',async(req,res)=>{
    let result = await Product.updateOne({id:req.params._id},{
      $set:req.body
    });
    res.send(result);
  });
  connectToDatabase().then(()=>{
    app.listen(4000,(e)=>{
      if(e){
        console.log("unable to start server hii ");
        console.log(e);
        return ;
      }
      console.log('server running on port 4000');
     });
  });
 