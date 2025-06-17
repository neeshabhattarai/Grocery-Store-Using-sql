const json = require("jsonwebtoken");
const HttpError = require("../Helper/HttpError");

module.exports=(req,res,next)=>{
    try {
      if(req.headers.method=="OPTION"){
        return next();
      }
    const token=req.headers.authorization.split(' ')[1];
    console.log(token);
    if(!token){
       return next(new HttpError("Token failed",404));
    }   
  
          let decode= json.verify(token,"your message");
          req.UserData= {user:decode.userid};
        //   console.log(req.UserData);
          next();
        } catch (error) {
            return next(new HttpError("Verification failed",404));
        }
}