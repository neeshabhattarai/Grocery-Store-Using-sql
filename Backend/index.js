const Error=require('./Helper/HttpError');
const express=require('express');
const bodyParser=require('body-parser');
let Products=[{"title":"apple"}];
const ProductRoute=require('./Router/Product');
const e = require('express');

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.json({"Products":Products});
})
app.use('/product',ProductRoute);
app.use((req,res,next)=>{
    res.status(500).json({
message:"Undefined url searched"
    })
})
app.use((error,req,res,next)=>{
    if(res.headersSent){
        next(error);
    }
    res.status(error.code || 500 );
    res.json({message:error.message || "An error occured"});
})

app.listen(5000,()=>{
    console.log("http://localhost:5000");
})