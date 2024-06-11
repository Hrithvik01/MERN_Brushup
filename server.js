const express=require('express')
const app=express()
const path=require('path')
const {logger}=require('./middleware/logger')
const PORT=process.env.port || 3500

app.use(logger)

app.use(express.json())
app.use('/',express.static(path.join(__dirname,'/public')))

//app.use(express.static('public'))

app.use('/',require('./routes/root'))

app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    } else if (req.accepts('json')){
        res.json({message : '404 : Page not found'})
    } else res.type('txt').send('404 : Page not found')
})

app.listen(PORT,()=>console.log(`server running on: ${PORT}`))