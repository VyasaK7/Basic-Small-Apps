//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://0.0.0.0:27017/todoListDB");

const itemsSchema = {
  name : String
};

const listSchema = {
  name : String,
  items : [itemsSchema]
};

const Item = mongoose.model( "Item" , itemsSchema);

const List = mongoose.model( "List" , listSchema);

const listItem1 = new Item({
  name : "Get Up from your Bed"
});

const listItem2 = new Item({
  name : "Eat Breakfast"
});

const listItem3 = new Item({
  name : "Go to Office"
});

const defaultItems = [listItem1,listItem2,listItem3];

app.get("/", function(req, res) {

  const day = date.getDate();
  Item.find({}).then(function(foundItems){
    if(foundItems.length===0){
      Item.insertMany(defaultItems).then(function(){
        console.log("Successfully added default items to DB");
      }).catch(function(err){
        console.log(err);
      });
      res.redirect("/");
    }
    else{
      res.render("list", {listTitle: "Today's List", newListItems: foundItems});
    }
  }).catch(function(err){
    console.log(err);
  })
});

app.get("/:customListName",function(req,res){
  const customList = _.capitalize(req.params.customListName);
  
  List.findOne({name:customList}).then(function(foundList){
    if(!foundList){
      const list = new List({
        name : customList,
        items : defaultItems
      });
      list.save();
      res.redirect("/"+customList);
    }
    else {
      res.render("list",{listTitle:foundList.name, newListItems:foundList.items});
    }
  }).catch(function(err){
    console.log(err);
  })
})

app.post("/delete",function(req,res){
  const checkedItemId = req.body.checkBoxx;
  const listName = req.body.listName;

  if(listName === "Today's List"){
    Item.findByIdAndRemove(checkedItemId).then(function(){
      console.log("Successfully Deleted Item")
      res.redirect("/");
    }).catch(function(err){
      console.log(err);
    })
  }
  else {
    List.findOneAndUpdate({name : listName}, {$pull : {items : { _id : checkedItemId }}})
    .then(function(foundList){
      console.log("Successfully deleted item in Custom List!")
      res.redirect("/"+ listName);
    }).catch(function(err){
      console.log(err);
    })
  }

});

app.post("/", function(req, res){

  const newItem = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name : newItem
  });

  if(listName==="Today's List"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name:listName}).then(function(foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    })
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
