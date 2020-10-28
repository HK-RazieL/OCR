const express = require("express");
const app = express();
const fs = require("fs")
const tesseract = require("tesseract.js");
const path = require("path");
const multer = require("multer");

const port = 3000;

var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  

var upload = multer({ storage : storage}).single('myfile');  


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.post('/OCR/',function(req,res){
    upload(req,res,function(err) {  
        if(err) {  
            return res.end("Error uploading file.");  
        }  
        tesseract.recognize(`./uploads/${req.file.filename}`,
        'bul',
        ).then(({data:{text}}) => {
            res.end(text);  
        })
    });  
}); 

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});