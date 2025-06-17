const CategoryModel = require("../Model/CategorySchema");
const {validationResult}=require('express-validator');
// const Product=require('../Model/CategorySchema');
const HttpError = require("../Helper/HttpError");
const { where, Sequelize } = require("sequelize");
const ProductModel = require("../Model/ProductSchema");
const { UPDATE } = require("sequelize/lib/query-types");
const sequelize = require("../Model/Database");
const GetProducts=async()=>{
   const CategoryModels=await CategoryModel.findAll({
      include:ProductModel
   })
   return CategoryModels;

}
const PatchCategory = async (req, res, next) => {
   const StartTransaction = await sequelize.transaction();
   const id = req.params.id;
   console.log(req.body);
   const newName = req.body.name;
   console.log(newName);
 
   try {
     const CategoryData = await CategoryModel.findByPk(id, { transaction: StartTransaction });
 
     if (!CategoryData) {
       await StartTransaction.rollback(); // Important: rollback if not found
       return next(new HttpError("Category not found", 404));
     }
 
     CategoryData.name = newName;
 
     await CategoryData.save({ transaction: StartTransaction });
     await StartTransaction.commit();
 
     res.status(200).json({
       message: "Category updated successfully",
       category: CategoryData, // use correct variable
     });
   } catch (error) {
     console.error(error);
     await StartTransaction.rollback();
     next(new HttpError("Error updating category", 500));
   }
 };
 
const DeleteCategory=async(req,res,next)=>{
   const id=req.params.id;
   await CategoryModel.findByPk(id).then(
      (es)=>
         es.destroy()
         
   ).catch((err)=>
      next(new HttpError("Something occured while deleting "))
   )
   res.json({
      message:"Deleted Successfully"
   })

}
const GetCategory=async(req,res,next)=>{
   let categorys;
   // console.log("Hello ");
   try {
       categorys=await CategoryModel.findAll();
      
   } catch (error) {
     next(new HttpError("Failed to fetch category")); 
   }
  
  res.json({message:categorys}) 
}

const GetProduct=async(req,res,next)=>{
   const category=req.query.category;
   let CategoryModels;
   try {
   if(!category){
      CategoryModels=await GetProducts();
      // console.log(CategoryModels);
   }else{
      CategoryModels= await CategoryModel.findAll({
         where:{name:category},
         include:{
            model:ProductModel}}).then((res)=>{
            if(res.length==0){
               return GetProducts();
            }
            return res;
            
         }
            )
         }
      
   } catch (error) {
      
   }

    
  
   
   //  console.log(CategoryModels);
    
    res.json({
      message:CategoryModels
    });
   }
   const PostCategory=async(req,res,next)=>{
      const Result=validationResult(req);
      // console.log(Result);
      if(!Result.isEmpty()){
         return next(new HttpError(Result.errors[0].msg));
      }
      const Category=await CategoryModel.findAll();
    let check = Category.find((val)=>val.name==req.body.name);

  
    if(check){
      return res.json({message:"already exist"})
    }
      CategoryModel.create({
         name:req.body.name
      })
      res.status(200).json({
         message:"created successfully"
      })
   }
 module.exports={
    GetProduct,
    PostCategory,
    GetCategory,
    DeleteCategory,
    PatchCategory
 }  
