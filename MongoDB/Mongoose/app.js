const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://0.0.0.0:27017/peopleDB');
  console.log("Database is connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  const fruitSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please specify the name of the fruit"]
    },
    rating : {
        type : Number,
        min : 1,
        max : 10
    },
    review : String
  });
  
  const Fruit = mongoose.model('Fruit', fruitSchema);

  const peopleSchema = new mongoose.Schema({
    name : String,
    age : Number,
    favFruit : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Fruit"
    }
  });
  
  const People = mongoose.model('People', peopleSchema);

//   const person = new People({
//       name : "Person 1",
//       age : 44
//   });

  const person = new People ({
      name : "Person New 1",
      age : 36,
      favFruit : Apple
    });

  person.save();

//   const orange = new Fruit ({
//     name : "Orange",
//     rating : 8,
//     review : "Nice Sour Fruit!"
//   });

//   const banana = new Fruit ({
//     name : "Banana",
//     rating : 7,
//     review : "Meme fruit!"
//   });

//   const grape = new Fruit ({
//     name : "grape",
//     rating : 8,
//     review : "Another Sour Fruit!"
//   });

// const sapota = new Fruit ({
//         name : "sapota",
//         rating : 10,
//         review : "Love this Fruit!"
//       });
      
//    sapota.save();
// fruit.save();
//   Fruit.insertMany([orange,banana,grape]);



////////////////////////////////////////////////////////////////////////////////////////



//   Fruit.find().then(function (data) {
//     // console.log(data);
//     data.forEach(function(fruit){
//         console.log(fruit.name);
//         // mongoose.connection.close();
//     })
//   }).catch(function(err){
//     console.log(err);
//   });

}


