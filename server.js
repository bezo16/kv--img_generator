const { static, urlencoded } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const multer = require('multer')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/' + req.body.category )
    
  },
  filename: function (req, file, cb) {
    fs.readdir(__dirname + '/public/' + req.body.category, (err, files) => {
      cb(null, 'img' + (files.length + 1 ) + '.' + file.originalname.split('.')[1] )
    });
  }
})

let upload = multer({ storage: storage })




app.get('/' , (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/nature', (req,res) => {
    fs.readdir(__dirname + '/public/nature', (err, files) => {
        res.json(files)
      });
})

app.get('/spirit', (req,res) => {
    fs.readdir(__dirname + '/public/spirit', (err, files) => {
        res.json(files)
      });
})

app.get('/book', (req,res) => {
    fs.readdir(__dirname + '/public/book', (err, files) => {
        res.json(files)
      });
})

app.get('/skull', (req,res) => {
    fs.readdir(__dirname + '/public/skull', (err, files) => {
        res.json(files)
      });
})

app.post('/upload', upload.single('photo'), (req,res) => {
  console.log(req.body)
  res.redirect('/')
})

app.listen(3000)












