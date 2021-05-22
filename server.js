const { static } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './public/upload',
})

app.use(express.json())
app.use(express.static('public'))

fs.readdir(__dirname + '/public/nature', (err, files) => {
    console.log(files);
  });

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

app.listen(3000)












