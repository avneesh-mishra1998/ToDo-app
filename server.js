const express= require("express")
const app= express();
const todoConn= require("./db/Todo")
require("./db/config")
const bodyParser= require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.set("view-engine", "ejs")

// get to-do data
app.get("/item", async (req, res) => {
    let option= {weekday:"long",year:"numeric",month:"long",day:"numeric"}
    let today= new Date().toLocaleDateString("en-US",option)
    console.log(today);
    let data = await todoConn.find({});
    if (data.length > 0) {
      res.render("home.ejs",{data:data,date:today});
    } else {
      res.render({ result: "No Product Found" });
    }
  });

  // post to-do item
app.post("/", async (req, res) => {
    let data = new todoConn(req.body);
    let result = await data.save();
    res.redirect("/item");
  });
 
  // deleting to-do item
  app.get("/item/:id", async (req, res) => {
    const result = await todoConn.findByIdAndRemove({ _id: req.params.id });
    console.log("THIS---------->",result);
    res.redirect("/item"); 
  });
 
  
   

app.listen(8000)