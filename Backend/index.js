const express=require('express');
const bodyParser=require('body-parser');
let Products=[{"title":"apple"}];

const app=express();
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.json({"Products":Products});
})

app.listen(5000,()=>{
    console.log("http://localhost:5000");
})