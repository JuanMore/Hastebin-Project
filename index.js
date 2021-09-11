const express = require('express')
const { get } = require('http')
const mongoose = require('mongoose')
const app = express()

const Document = require('./models/Document')
mongoose.connect('mongodb://localhost:27017/Codebin', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection OPEN!!!")
})
.catch(err => {
    console.log("OH NO Mongo Connection ERROR!!!!")
    console.log(err)
})


// allow public files
app.use(express.static('public'))
// process our views
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))



app.get("/", (req, res) => {
    const code = `Welcome to WasteBin!
Use the commands in the top right corner
to create a new file to share with others.`
  
    res.render("code-display", { code, language: "plaintext" })
  })
  
  app.get("/new", (req, res) => {
    res.render("new")
  })
  

app.post('/save', async(req, res) => {
    //re.body = form + value
    const value = req.body.value
    try {
        const document = await Document.create({value})
        res.redirect(`/${document.id}`)
    }
    catch (e){
        res.render('new', {value})
    }
})

app.get('/:id/duplicate', async(req, res) => {
    const id = req.params.id
    try {
        // access the document
        const document = await Document.findById(id)
        // render doc
        res.render('new', {value: document.value})
    }
    // if it fails we redirect to home
    catch(e){
        res.redirect(`/${id}`)
    }
})

app.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
        // access the document
        const document = await Document.findById(id)
        // render doc
        res.render('code-display', {code: document.value, id})
    }
    // if it fails we redirect to home
    catch(e){
        res.redirect('/')
    }
})

app.listen(3007, () => {
    console.log('Our server is connected')
})