const multer = require("multer");
const path = require("path");


const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname+"/public/images") );

    },
    filename:(req,file,cb)=>{
        cb(null,`${new Date().getTime()+"_"+file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  const fileUpload=multer({storage:Storage,fileFilter:fileFilter});
module.exports=fileUpload;