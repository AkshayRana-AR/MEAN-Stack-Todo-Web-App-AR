 const express=require('express');
 const app=express();
const port=process.env.PORT || 3000; 
 const path=require('path');

 const api=require('./server/routes/route');

 app.use(express.static(path.join(__dirname,'dist/todo-web-app-mean-stack-ar')));

 app.use(express.json());

 app.use('/api',api);

 app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/todo-web-app-mean-stack-ar/index.html'));
 });

 app.listen(port,()=>{
     console.log(`Listening at port ${port}`);
 });