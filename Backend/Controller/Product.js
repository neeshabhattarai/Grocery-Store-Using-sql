const {validationResult} =require('express-validator');
const HttpError=require('../Helper/HttpError');
const Product =require('../Model/ProductSchema');
const CategoryModel = require("../Model/CategorySchema");
const natural=require('natural');
const TfIdf = natural.TfIdf;


const sequelize = require('../Model/Database');
const DeleteFile = require('../Helper/DeleteFile');




const GetProduct=async(req,res,next)=>{
 const ProductDetail= await Product.findAll();
 res.json({
    message:ProductDetail
 });
}
const PatchProduct = async (req, res, next) => {
    const id = req.params.id;
  
    // Start a new transaction
    const transaction = await sequelize.transaction();
  
    try {
      // Destructure safely in case no file is provided
      const image = req.file ? req.file.filename : undefined;
      const { name, price, categoryCatId,description } = req.body;
  
      const product = await Product.findByPk(id, { transaction });
  const {price:oldPrice,image:unLinkImage}=product.get();
      if (!product) {
        await transaction.rollback();
        return next(new HttpError("Product not found", 404));
      }
  
      product.name = name;
      product.oldPrice=oldPrice;
      product.price = price;
      product.categoryCatId = categoryCatId;
      product.description=description;
     if(image){
      DeleteFile(unLinkImage,async(err)=>{
        if(err){
          return next(new HttpError("Updated image failed"));
        }
      await product.save({ transaction });
      await transaction.commit();
  
      res.json({
        message: "Successfully updated",
      });
    })
  }
    if(!image){
      product.image=product.image;
      await product.save({ transaction });
      await transaction.commit();
      res.json({
        message: "Successfully updated",
      });
    }
  } catch (error) {
      console.error(error);
      await transaction.rollback();
      next(new HttpError("Can't update product data", 500));
    }
  };
const GetReccomendation = async (req, res) => {
  try {
    const name = req.query.item?.toLowerCase();
    console.log("Query item:", name);

    const ProductDetail = await Product.findAll({
      include:CategoryModel
    });
    console.log(ProductDetail[0].category.name);

    if (!ProductDetail || ProductDetail.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    const products = ProductDetail.map(p => ({
      id: String(p.pro_id),
      name: p.name,
      content: `${p.name} ${p.category.name}  ${p.description || ""}`.toLowerCase()
    }));

    const matchedProduct = products.find(p => p.name.toLowerCase() === name);

    if (!matchedProduct) {
      return res.status(404).json({ error: "Product not found for recommendation" });
    }

    const tfidf = new TfIdf();
    products.forEach(p => tfidf.addDocument(p.content));

    const index = products.findIndex(p => p.id === matchedProduct.id);

    const similarities = [];
    let maxScore = 0;

    tfidf.tfidfs(products[index].content, (i, measure) => {
      if (i !== index) {
        similarities.push({ id: products[i].id, score: measure });
        if (measure > maxScore) maxScore = measure;
      }
    });

    
    similarities.push({
      id: matchedProduct.id,
      score: maxScore + 1 
    });

    similarities.sort((a, b) => b.score - a.score);

    const results = similarities.map(sim => {
      const prod = ProductDetail.find(p => String(p.pro_id) === sim.id);
      return {
        id: sim.id,
        name: prod.name,
        price: prod.price,
        image: prod.image,
        description: prod.description,
        score: sim.score.toFixed(3)
      };
    });

    res.json({ message: results });

  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ error: "Failed to get recommendations." });
  }
};


  
const PostProduct=async(req,res,next)=>{
    const error=validationResult(req);
   
    const {name,price,categoryCatId,description}=req.body;
    const image=req.file?req.file.filename:null;
    if(!error.isEmpty()){
       return next(new HttpError(error.errors[0].msg,404));
    }
    try {
        const NewProduct=await Product.create({
            name:name,
            price,
            image:image,
           description,
            categoryCatId:categoryCatId
        });
        // await NewProduct.save();
        
    } catch (error) {
        console.log(error);
       return next(new HttpError("Creation failed",500));
    }
    res.status(201).json({message:"product added successfully"})
    
}
const DeleteProduct=async(req,res,next)=>{
    const id=req.params.id;
   
   try{
    const ProductDetail=await Product.findByPk(id);
  const{image}=await ProductDetail.get();
  // console.log(image);
  DeleteFile(image, async (err) => {
    if (err) {
      return next(new HttpError("File could not be deleted", 500));
    }

    try {
      await ProductDetail.destroy();
      return res.json({ message: "Product deleted successfully" });
    } catch (err) {
      return next(new HttpError("Product deletion failed", 500));
    }
  });
   }catch(err){
    return next(new HttpError("Product destroy unsuccessfull",500));
   }
}
module.exports={
    GetProduct,
    PostProduct,
    DeleteProduct,
    PatchProduct,
    GetReccomendation
} 