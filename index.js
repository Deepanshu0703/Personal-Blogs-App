const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const mongoose=require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect("mongodb://localhost:27017/blogDB",{useNewUrlParser:true,useUnifiedTopology:true});

const itemsSchema = new mongoose.Schema({
    day:String,
    title: String,
    blogs: String
});

const blog=mongoose.model("blog",itemsSchema);

const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};
const today = new Date();
const days = today.toLocaleDateString('en-US', options);

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    blog.find({}, (err, foundItems) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', { year: new Date().getFullYear(),day: days, data: foundItems });
        }
    })
   
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
    const titl=req.body.title;
    const blogsm=req.body.blog;
    const newItem = new blog({
        title: titl,
        day:days,
        blogs: blogsm
    });
    newItem.save();
    res.redirect("/");

});

app.get("/blogs/:id",(req,res)=>{
    const id=req.params.id;
    blog.findById(id,(err,resp)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("blogs",{year: new Date().getFullYear(),id:resp._id,days:resp.day,title: resp.title,blog:resp.blogs});
        }
    })
}
);

app.post('/del',(req,res)=>{
    const id = req.body.id;
    blog.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
})

app.listen(3000,()=>{
    console.log("Server is running");
});

