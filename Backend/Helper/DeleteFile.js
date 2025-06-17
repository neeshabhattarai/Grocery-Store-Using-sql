
const fs = require("fs");

const DeleteFile = (filename, callback) => {
  fs.unlink(`./public/images/${filename}`, (err) => {
    if (err) {
      console.log("Error deleting file:", err);
      return callback(err); // send error back
    }

    console.log("File deleted");
    callback(null); // no error
  });
};

module.exports = DeleteFile;
