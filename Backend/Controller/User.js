
const UserModel=require('../Model/UserSchema');
const bcryptjs=require('bcryptjs');
const HttpError=require('../Helper/HttpError');
const {v4:Id}=require('uuid');
const {validationResult}=require('express-validator');
const json = require('jsonwebtoken');
const sequelize = require('../Model/Database');
const { UUID, UUIDV4, HostNotReachableError } = require('sequelize');
const DeleteFile = require('../Helper/DeleteFile');
// const nodemailer=require("nodemailer");
// nodemailer.createTransport({
//     auth:
// })
// {
//     "name":"Albina",
//     "email":"abc@gmail.com",
//     "contact":9846173537,
//     "password":"hello12",
//     "image":"later post"
//    }
const GetUser=async(req,res,next)=>{
 
    const id=req.params.id;
    let UserData;
    try {
         UserData= await UserModel.findAll({where:{userid:id}});
         if(UserData.length==0){
            const Error=new HttpError("No user found",404);
            return next(Error);
        }
    } catch (error) {
       return(next(new HttpError("Cant find user data"))); 
    }
    
    // console.log("User"+UserData);
 
   return res.status(200).json({message:UserData});
 }
 const GetAllUser=async(req,res,next)=>{
    try {
        const User=await UserModel.findAll();
        res.json({
            message:User
        })
        
    } catch (error) {
        next(new HttpError("Cant get all User"));
    }

 }
const LoginUser=async(req,res,next)=>{
    console.log(req.body);
    const {email,password}=req.body;
    let User;
    try{
     User=await UserModel.findOne({where:{email}});
     console.log(User);
   
    let PasswordCheck=await bcryptjs.compare(password,User.password);
    // console.log(PasswordCheck);
    let token;
  
    if(!User || !PasswordCheck){
        // console.log("Test")
        return next(new HttpError("Invalid credentials ",500));
     }
    }catch(err){
        return next(new HttpError("Invalid credentials",500));
            };
    const {userid}=User;
    //  console.log(PasswordCheck,User);
    try {
       
        token=json.sign({userid,password},"your message",{expiresIn:"1h"});
    } catch (error) {
        next(new HttpError("Token generation failed"))
    }
   
    res.json({
        message:"login Successfull",
        token,
        userid,
        User
    });

}
const CreateUser=async(req,res,next)=>{
    console.log(req.body);
const Result=validationResult(req);

if(!Result.isEmpty()){
    const errors= new HttpError(Result.errors[0].msg,500);
    return next(errors);
}
const uuid=Id();
const{name,email,password,contact,role}=req.body;
console.log(req.body);
const image=req.file?req.file.filename:null;
if(!image){
  return  res.json({
        message:"file can't be upload"
    })
}
const hashedPassword=await bcryptjs.hash(password,12);
console.log(typeof hashedPassword);
const RegisterUSer=await UserModel.create({
  userid:uuid,
    name:name,
    email:email,
    password:hashedPassword,
    contact:contact,
    role:role,
    image:image
    // contact:req.body.contact,
    // age:req.body.age
});

try {
   await RegisterUSer.save();
} catch (error) {
    // console.log(error); 
   const errors= new HttpError("Error at creating user",500);
  return next(errors);
}
let token;
try {
token=json.sign({uuid,password},"your message",{expiresIn:"1h"});
    
} catch (error) {
  return  next(new HttpError("Could not create token ",500));
}


res.json({
    message:"Created Successfully",
    token:token,
    userid:uuid
});

// res.json(req.body);

}
const UpdateUser=async(req,res)=>{
    const {email,name}=req.body;
    let UserUpdate=await UserModel.findOne({email});
    console.log(UserUpdate);
    UserUpdate.name=name;
    try {
     await UserUpdate.save();
    } catch (error) {
        return next("Something went wrong while updating user , try again",500);
    }
    res.status(200).json("Updated Successfully");
}
const Updateuser = async (req, res, next) => {
    const id = req.params.id;
    console.log(req.params);

    const transaction = await sequelize.transaction();

    try {
        const image = req.file ? req.file.filename : undefined;
        console.log(req.body);
        const { name, email, contact,role } = req.body;

        const user = await UserModel.findOne({ where: { userid: id }, transaction });
        const{image:unLinkImage}=user.get();

        if (!user) {
            await transaction.rollback();
            return next(new HttpError("User not found", 404));
        }

        user.name = name;
        user.email = email;
        user.contact = contact;
       
        user.role=role;
        if(image){
            DeleteFile(unLinkImage,async(err)=>{
              if(err){
                return next(new HttpError("Updated image failed"));
              }
              user.image=image;
            await user.save({ transaction });
            await transaction.commit();
        
            res.json({
              message: "Successfully updated",
            });
          })
        }
          if(!image){
            user.image=user.image;
            await user.save({ transaction });
            await transaction.commit();
            res.json({
              message: "Successfully updated user photo",
            });
        }
           } catch (error) {
        console.error(error);
        await transaction.rollback();
        next(new HttpError("Can't update user data", 500));
    }
};

const DeleteUser=async(req,res,next)=>{
    console.log(req.params);
    const {userid}=req.params;
    // console.log(id);
    const UserDelete=await UserModel.findByPk(userid);
  const {image}=await UserDelete.get();
    if(!userid){
        return next("Missing id");
    }
    try {
        DeleteFile(image,async(err)=>{
            if(err){
return next(new HttpError("image cant be deleted"));
            }
            try {
                
                await UserDelete.destroy(); 
                res.json({message:"Deleted Successfully"});
            } catch (error) {
                return next(new HttpError("User cant be deleted"));
            }
       
     
    })
        
    } catch (error) {
        return next("Something went wrong while deleting user , try again",500);
    }

}
module.exports={
    CreateUser,
    GetUser,
    LoginUser,
    DeleteUser,
    UpdateUser,
    GetAllUser,
    Updateuser
}