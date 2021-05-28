const { static, urlencoded } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const multer = require('multer')
const imageToBase64 = require('image-to-base64')
const mongoose = require('mongoose')

const Skull = require('./schemas/skull')
const Spirit = require('./schemas/spirit')
const Book = require('./schemas/book')
const Nature = require('./schemas/nature')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.use(cspHeader)

dbURL = 'mongodb+srv://bezo16:pokec5555@cluster0.kskxj.mongodb.net/kvimg?retryWrites=true&w=majority'
mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true},(err) => {
  if(!err) console.log('pripojeny do db')
})


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
    
  },
  filename: function (req, file, cb) {
    fs.readdir(__dirname + '/public/' + req.body.category, (err, files) => {
      cb(null, 'img' + '.' + file.originalname.split('.')[1] )
    });
  }
})

let upload = multer({ storage: storage })




app.get('/' , (req,res) => {
  res.set("Content-Security-Policy", "script-src '*'").sendFile(__dirname + '/index.html')
})

app.get('/nature', (req,res) => {
    Nature.find({},(err,items) => {
      res.json(items)
    })
})

app.get('/spirit', (req,res) => {
     Spirit.find({},(err,items) => {
      res.set("Content-Security-Policy", "script-src '*'").json(items)
     })
})

app.get('/book', (req,res) => {
    Book.find({},(err,items) => {
      res.json(items)
    })
})

app.get('/skull', (req,res) => {
    Skull.find({},(err,items) => {
      res.json(items)
    })
})

app.post('/upload', upload.single('photo'), (req,res) => {
  imageToBase64(__dirname + '/uploads/img.jpg') // Path to the image
    .then(
        (response) => {
          let newImg
          if(req.body.category === 'skull')  newImg = new Skull({image:response})
          if(req.body.category === 'nature')  newImg = new Nature({image:response})
          if(req.body.category === 'book')  newImg = new Book({image:response})
          if(req.body.category === 'spirit')  newImg = new Spirit({image:response})
          newImg.save((err) => {
          fs.readdir(__dirname + '/uploads',(err,files) => {

            fs.unlink(__dirname + '/uploads/' + files[0],(err) => {
              if(err) console.log(err)
              res.set("Content-Security-Policy", "script-src '*'").redirect('/')
            })  
          })
       if(err) console.log('dačo na piču')
} 
)
        }).catch(
        (error) => {
          res.send(error) // Logs an error if there was one
        })

})

app.post('/delete',(req,res) => {
  
  if(req.body.category === 'skull') {
      Skull.findByIdAndDelete(req.body.idImg, () => {
      res.redirect('/')
    })}
  if(req.body.category === 'nature') {
      Nature.findByIdAndDelete(req.body.idImg, () => {
      res.redirect('/')
    })}
  if(req.body.category === 'spirit') {
      Spirit.findByIdAndDelete(req.body.idImg, () => {
      res.redirect('/')
    })}
  if(req.body.category === 'book') {
      Book.findByIdAndDelete(req.body.idImg, () => {
      res.redirect('/')
    })}

})

app.get('/test',(req,res) => {
  res.send('test')
})

function cspHeader(req,res,next) {
  res.setHeader("Content-Security-Policy", "default-src *")
  next()
}

app.listen(process.env.PORT || 3000)












