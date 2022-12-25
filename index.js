const express=require('express');
const app=express();
const data=require(__dirname+"/Data.js");
const bodyParser=require('body-parser');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
var datas=data.function();
app.get("/",(req,res)=>{
    res.render("index" ,{
        year: new Date().getFullYear(),
        data: datas
    });
});

app.get("/about",(req,res)=>{
    res.render("about" ,{year: new Date().getFullYear()});
});

app.get("/contact",(req,res)=>{
    res.render("contact" ,{year: new Date().getFullYear()});
});

app.get("/compose",(req,res)=>{
    res.render("compose" ,{year: new Date().getFullYear()});
});

app.post("/compose",(req,res)=>{
    const title=req.body.title;
    const blog=req.body.blog;
    const obj={
        id: datas.length+1,
        title: title,
        blogs: blog
    }
    data.function2(obj);
    res.redirect("/");

});

app.get("/blogs/:id",(req,res)=>{
    const id=req.params.id;
    datas.forEach((data)=>{
        if(data.id==id){
            res.render("blogs",{
                year: new Date().getFullYear(),
                id: data.id,
                title: data.title,
                blog: data.blogs
            });
        }
    });
}
);

app.listen(3000,()=>{
    console.log("Server is running");
});

