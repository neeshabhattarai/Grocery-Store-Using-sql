const { validationResult } = require("express-validator");
const CartSchema=require('../Model/Cart');
const CartItemSchema=require('../Model/CartItem');
const axios = require("axios");
const ProductSchema=require('../Model/ProductSchema');
const HttpError = require("../Helper/HttpError");
const { where } = require("sequelize");
const sequelize = require("../Model/Database");

const PostCart = async (req, res, next) => {
  // console.log(req.body);
  const Result = validationResult(req);
  if (!Result.isEmpty()) {
    return next(new HttpError(Result.errors[0].msg));
  }

  const { proId, quantity,rating } = req.body;

  const product = await ProductSchema.findByPk(proId);
  if (!product) {
    return next(new HttpError("No product found with existing id", 500));
  }

  let cart;
  // const UserId=await req.UserData.user;
  // console.log(UserId);
  // console.log(req.UserData)
  try {
    cart = await CartSchema.findOrCreate({
      where: { userUserid: req.UserData.user }
    });
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not find or create cart", 500));
  }

  try {
    const [cartInstance, created] = cart;


    const existingProducts = await cartInstance.getProducts({where:{pro_id:proId}});
    // console.log(existingProducts);

    if (existingProducts.length > 0) {
      // Product exists, update quantity
      const existingProduct = existingProducts[0];
      const oldQuantity = existingProduct.cartItem.quantity;
      const newQuantity = oldQuantity + quantity;

      await cartInstance.addProduct(product, { through: { quantity: newQuantity ,rating} });
    } else {
      // Product not in cart, add it
      await cartInstance.addProduct(product, { through: { quantity ,rating} });
    }

  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not integrate cart and product"));
  }

  res.json({
    message: "Added to cart"
  });
};

const GetCart = async (req, res, next) => {
  try {
    const cart = await CartSchema.findOne({
      where: { userUserid: req.UserData.user },
      include: [
        {
          model:ProductSchema,
          through: { attributes: ["quantity","id"] }, // join table info
        },
      ],
    })

    // console.log(cart);
    if (!cart) {
      return next(new HttpError("Cart not found", 404));
    }

  

    res.json({ message: cart.get() });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Could not fetch cart details", 500));
  }
};
const GetAllCart=async(req,res)=>{
  const DetailsOfCart=await CartSchema.findAll({
    include:ProductSchema,
     attributes:["quantity"]
     
  })
  res.json({
    message:DetailsOfCart
  })
}
const DeleteIndividualItem=(req,res)=>{

}
const DeleteCart=async(req,res)=>{
  console.log("Hello");
  const id=req.params.id;
  try {
    const CartDelete=await CartItemSchema.findByPk(id);
    CartDelete.destroy()
  } catch (error) {
    return next(new HttpError("Cart Item deletion unsuccessfull"),)
  }
  res.json({
    message:"Successfully Deleted "
  })
}


const Payment = async (req, res, next) => {
  const { total_amount, transaction_uuid } = req.body;

  try {
    const esewaURL = `https://epay.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
    
    const response = await axios.get(esewaURL);

    // Return the eSewa response to your frontend
    res.json(response.data);
  } catch (error) {
    console.error("eSewa request failed", error.message);
    res.status(500).json({ error: "Failed to fetch status from eSewa." });
  }
};



module.exports={PostCart,GetCart,GetAllCart,DeleteCart,Payment}