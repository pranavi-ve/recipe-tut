const express = require('express');
const {getRecipes} = require('../controllers/recipe.controller')

const router = express.Router();

router.get('/',(req,res,next)=>{
    getRecipes()
    .then((data)=>res.json(data))
    .catch((e)=>next(e))
})


module.exports = router;