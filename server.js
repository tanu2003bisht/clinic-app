const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/',async(req,res) =>{
    res.send('welcome to our clinic how can i help you!');
})


app.listen(PORT,()=>{
    console.log('the localhost is running');
})