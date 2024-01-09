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
        enroll: (req.body.enroll !=null && req.body.enroll != undefined ) ? req.body.enroll : "",
        sem: (req.body.sem !=null && req.body.sem != undefined) ? req.body.sem : "",
        email: (req.body.email !=null && req.body.email != undefined) ? req.body.email : "",
        favSports: (req.body.favSports !=null && req.body.favSports != undefined) ? req.body.favSports : "",
        address: (req.body.address !=null && req.body.address != undefined) ? req.body.address : "",
        gender: (req.body.gender !=null && req.body.gender != undefined) ? req.body.gender : "",
        city: (req.body.city !=null && req.body.city != undefined) ? req.body.city : "",
        img:(req.body.img !=null && req.file.imgs != undefined) ?  'http://127.0.0.1:3000/'+req.files.img.name.replaceAll(' ','') : ""
    })
    if(req.body.img !=null && req.file.imgs != undefined){
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

//https://api.render.com/deploy/srv-cmejutn109ks73c77qdg?key=WLN_F55T4Vw