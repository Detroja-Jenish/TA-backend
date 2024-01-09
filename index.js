const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require('path')
const fs = require('fs')
data = []
app = express()
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(cors())
// app.use('/',express.static('imgs'))
app.use(express.static(path.join(__dirname, 'imgs'))) 
app.use(fileUpload())
app.post("/send", (req,res)=>{
    console.log(req)
    console.log("==========================")
    console.log("==========================")
    console.log("==========================")
    console.log("==========================")
    console.log("==========================")
    console.log("==========================")
    console.log("==========================")
    // console.log(req.query)
    // console.log(req.body.name)
    // console.log(req.body.caption)
    // console.log(req.files)
    // savedImgPath = req.files.myFile.name.replaceAll(' ','')
    data.push({fullName: req.body.fullName,
        enroll: req.body.enroll,
        sem: req.body.sem,
        email: req.body.email,
        favSports: req.body.favSports,
        address: req.body.address,
        gender: req.body.gender,
        city: req.body.city,
        img: 'http://127.0.0.1:3000/'+req.files.img.name.replaceAll(' ','')
    })
    
    req.files.img.mv('./imgs/'+req.files.img.name.replaceAll(" ",''))
    res.send(req.body);
})

app.get("/get", (req,res)=>{
    console.log(data)
    res.send(data)
})

app.get("/clearAll" , (req,res)=>{
    data = [];
    files = fs.readdirSync('./imgs')
   
    // fs.unlink("./imgs/*",()=>{console.log("shbdfs===")})
    console.log(files)
    for(file of files){
        if(file != "abc.txt"){
            fs.unlink("./imgs/"+file,()=>{console.log("shbdfs===")})
        }
    }
    fs.mkdir(path.join(__dirname, 'imgs'),(err) => { 
        if (err) { 
            return console.error(err); 
        } 
        console.log('Directory created successfully!'); 
    })
    fs.rmdir("./imgs", ()=>{console.log("shbd")})
    res.send("all cleared")
})

app.listen(3000, ()=>{
    console.log("ashdjnad")
})