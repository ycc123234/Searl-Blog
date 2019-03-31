const express=require('express');
const request=require('request');
var router=express.Router();

router.get('/list',(req,res)=>{
    request('http://localhost:8888/SearlBlog/song',(err,res,body)=>{if(err)throw err;
        console.log('statusCode',res);
        console.log('body:',body);
    })
})

module.exports=router;
