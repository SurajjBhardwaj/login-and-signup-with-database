const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;


app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));



// app.get("/", function (req, res) {

//   res.render("rejistration");
//   console.log("okay");
// });

const uri ="mongodb://surajjbhardwajj:Suraj%40jyotimongo@ac-22ynpij-shard-00-00.walpukq.mongodb.net:27017,ac-22ynpij-shard-00-01.walpukq.mongodb.net:27017,ac-22ynpij-shard-00-02.walpukq.mongodb.net:27017/?ssl=true&replicaSet=atlas-zs9ix5-shard-0&authSource=admin&retryWrites=true&w=majority";
  MongoClient.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      }

const collection = client.db("rejistereddata").collection("rejister");

app.get("/", function (req, res) {

  res.render("rejistration");
  console.log("okay");

});


app.post("/data", function (req, res) {
  var dataofclient = {
    name: req.body.namee,
    email: req.body.email,
    phone: req.body.phone,
    dob: req.body.dob,
    password: req.body.password,
  };

  //       // if(contact.name === "" || contact.messege === "") {
  //       //   res.send("please fill the data properly");
  //       // }

  console.log(dataofclient);
      collection.insertOne(dataofclient, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
          return;
        }
        //   alert('thank you we will contact you very soon');
        console.log("data saved");
        res.redirect("/");
       
      });
    }
  );

 

app.get("/sign", function (req, res) {
  res.render("signin");
});

app.post("/new", async(req,res) => {
     
   
   const email = req.body.emaill;
   const password = req.body.passwordd;
   
  console.log(email + " &" +password );
  const s= await collection.findOne({email : email});
  if(s){
    if(s.password==password){
      res.send("logined")
    }else{
      res.send("something is wrong");
    }
  }else{
    res.send("something is wrong");
  }
  console.log(s);
  // res.send("thannks")
  // res.send("thank you for login");
})

});

//to close the connection of mongodb
//client.close();  
      
app.listen("4000", function () {
  console.log("running at 4000");
});
