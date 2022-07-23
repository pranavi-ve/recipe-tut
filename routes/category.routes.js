const express = require('express');
const {getCategories} = require('../controllers/category.controller')

const router = express.Router();

router.get('/',(req,res,next)=>{
    getCategories()
    .then((data)=>res.json(data))
    .catch((e)=>next(e))
})


module.exports = router;