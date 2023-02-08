const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-varsha:varsha123@cluster0.oyyo7nr.mongodb.net/query");
const schemaNew=new mongoose.Schema({
  name:String,
  query:String,
  message:String,
  querywhat:String
});
const queries=new mongoose.model("queries",schemaNew);
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(request,res){
  const query=new queries({
    name:request.body.firstname,
    query:request.body.field,
    message:request.body.email,
    querywhat:request.body.query
  });
  query.save();
  if(res.statusCode===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
  res.sendFile(__dirname+"/failure.html");
}
})
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("connected");
})
