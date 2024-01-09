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
    
    data.push({fullName: req.body.fullName,
        enroll: (enroll in req.body) ? req.body.enroll : "",
        sem: (sem in req.body) ? req.body.sem : "",
        email: (email in req.body) ? req.body.email : "",
        favSports: (favSports in req.body) ? req.body.favSports : "",
        address: (address in req.body) ? req.body.address : "",
        gender: (gender in req.body) ? req.body.gender : "",
        city: (city in req.body) ? req.body.city : "",
        img:(img in req.files) ?  'http://127.0.0.1:3000/'+req.files.img.name.replaceAll(' ','') : ""
    })
    if(img in req.files){
        req.files.img.mv('./imgs/'+req.files.img.name.replaceAll(" ",''))
    }
    res.send(req.body);
})

app.get("/get", (req,res)=>{
    console.log(data)
    res.send(data)
})

app.get("/clearAll" , (req,res)=>{
    data = [];
    files = fs.readdirSync('./imgs')

    for(file of files){
        if(file != "abc.txt"){
            fs.unlink("./imgs/"+file,()=>{console.log("shbdfs===")})
        }
    }


    res.send("all cleared")
})

app.listen(3000, ()=>{
    console.log("ashdjnad")
})