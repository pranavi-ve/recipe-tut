const express = require('express');
const {getIngredients} = require('../controllers/ingre.controller')
const router = express.Router();

router.get('/', (req,res,next)=>{
    //ingredients ane db 
    getIngredients()
    .then((data)=>res.json(data))
    .catch((e)=>next(e))
})


module.exports = router;