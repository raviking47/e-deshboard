const express = require("express");
require('./db/config')
const cors = require('cors')
const user = require('./db/Users')
const products =require('./db/Poducts');
const { Category } = require("@material-ui/icons");



const app = express();
const port = 5000;

app.use(express.json())
app.use(cors());

app.post("/register", async(req, res) => {
  let User = new user(req.body);
  let result= await User.save()
  res.send(result);
});



app.post("/login", async(req, res) => {
  // console.log(req.body)
  if(req.body.password && req.body.email){
    let User =  await user.findOne(req.body).select('-password');
    if (user){
    res.send(User);
      }else{
      res.send({result:'no user found'})
    }
  }else{
    res.send({result:"No result Found"})
  }
});


app.post("/add-product", async(req, res) => {
  let product = new products(req.body);
  let result= await product.save()
  res.send(result);
});

app.get("/product", async(req, res) => {
  let product = await products.find();
  if(products.length>0){
    res.send(product);
  }else{
   res.send({result:"No found"})
  }
  
});
app.delete("/product/:id", async(req, res) => {
  
  const result=  await products.deleteOne({_id:req.params.id})
  res.send(result);
});
app.get("/product/:id", async(req, res) => {
  let result = await products.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }else{
    res.send('No product')}
});

app.put("/product/:id", async(req, res) => {
  let result = await products.updateOne({_id:req.params.id},
    {
      $set:req.body
    });
  
    res.send(result)
 
});
app.get("/search/:key", async(req, res) => {
  let result = await products.find({
    "$or":[
      {
        name:{$regex:req.params.key},
       
      },
      {
        category:{$regex:req.params.key},
      }
      ,{
        price:{$regex:req.params.key},
       
      },
      {
        campany:{$regex:req.params.key},

      }
      
      
    ]
  });

    res.send(result)
  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
