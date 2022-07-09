const express = require('express');
const authRouter = require('./routes/auth.routes');

const server = express();
const port = 5000;

server.get('/',(req,res) => {
    res.json("hi");
})
server.use('/auth',authRouter);



server.listen(port,function(err){
    if(err)throw err;
    console.log('listen on port',port)
});
