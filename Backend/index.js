const Error=require('./Helper/HttpError');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
let Products=[{"title":"apple"}];
const ProductRoute=require('./Router/Product');
const CategoryRoute=require('./Router/Category');
const CartRoute=require('./Router/Cart');
const OrderRoute=require('./Router/Order');
const UserRoute=require('./Router/User');
const sequelize=require('./Model/Database');
const ProductModel=require('./Model/ProductSchema');
const OrderModel=require('./Model/Order');
const OrderItemModel=require('./Model/OrderItem');
const CartModel=require('./Model/Cart');
const CartItemModel=require('./Model/CartItem');
const PaymentRoute=require('./Router/Payment');


const CategoryModel=require('./Model/CategorySchema');
const UserModel = require('./Model/UserSchema');

const fileUpload = require('./Product');
const Payment=require("./Model/Payment");


const app=express();
app.use(express.static(__dirname+"/public"));
app.use("/images",express.static(__dirname+"/public/images"));

app.use(cors());

app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({extended:false}));




// console.log(__dirname);


// app.use((req,res,next)=>{
//     CategoryModel.findByPk(1).then((category)=>{
// req.category=category;
// next();
//     })
// })
app.get('/',(req,res)=>{
    res.json({"Products":Products});
})
// app.use('/product',ProductRoute);
// app.post("/product",(req,res,next)=>{
//     console.log(req.body);
// })
app.use('/user',UserRoute);
app.use('/category',CategoryRoute);
app.use('/cart',CartRoute);
app.use('/order',OrderRoute)
app.use('/product',ProductRoute);
app.use('/payment',PaymentRoute);
app.use((req,res,next)=>{
    res.status(404).json({
message:"Undefined url searched"
    })
})

app.use((error,req,res,next)=>{
    if(res.headersSent){
        next(error);
    }
    const statusCode = typeof error.code === "number" ? error.code : 500;
    res.status(statusCode);
    res.json({message:error.message || "An error occured"});
})
ProductModel.belongsTo(CategoryModel, { constraints: true, onDelete: "CASCADE" });
CategoryModel.hasMany(ProductModel);

UserModel.hasMany(OrderModel);
OrderModel.belongsTo(UserModel);

UserModel.hasOne(CartModel);
CartModel.belongsTo(UserModel);

CartModel.belongsToMany(ProductModel, { through: CartItemModel });
ProductModel.belongsToMany(CartModel, { through: CartItemModel });

OrderModel.belongsToMany(ProductModel, { through: OrderItemModel });
ProductModel.belongsToMany(OrderModel, { through: OrderItemModel });


OrderItemModel.belongsTo(OrderModel);
OrderItemModel.belongsTo(ProductModel);

UserModel.hasMany(Payment);     
Payment.belongsTo(UserModel);
CartItemModel.belongsTo(CartModel);
CartItemModel.belongsTo(ProductModel);






// OrderModel.belongsTo(UserModel);

sequelize.sync().then((res)=>{
    // console.log(res);
    app.listen(5000,()=>{
        console.log("http://localhost:5000");
    })
}).catch((err)=>{
    console.log(err);
});
