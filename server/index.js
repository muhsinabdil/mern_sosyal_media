const express =require('express');
const cors =require('cors');
const bodyParser=require('body-parser');

const app=express();

app.use(cors());

app.use(badyParser.json({limit:'30mb', extended:true}))

app.use(badyParser.urlencoded({limit:'30mb', extended:true}))


const PORT =5000;


app.listen(PORT,()=>{
    
    console.log("server is running",PORT);
})