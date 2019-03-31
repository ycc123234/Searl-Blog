const express=require('express');
const request=require('request');
var router=express.Router();

router.get('/list',(req,res)=>{
    request('http://localhost:8888/SearlBlog/song',(error,response,body)=>{if(error)throw error;
        console.log('statusCode',response&&response.statusCode);
        res.send(body);
    })
})

module.exports=router;
