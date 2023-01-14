const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const { stringify } = require('querystring');

const uri = 'mongodb://localhost:27017/foaDb';
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Db foa Connected');
    }
  }
);
const app = express();
app.use(express.json());

// monogo db
const schema = {
  id: Number,
  name: String,
  discription: String,
  price: Number,
};

const Meals = mongoose.model('meals', schema);

app.post('/meals', async (req, res) => {
  const data = new Meals({
    id: req.body.id,
    name: req.body.name,
    discription: req.body.discription,
    price: req.body.price,
  });

  const resData = await data.save();
  console.log(resData);
  console.log(req.body);
  res.json({
    status: 'sucsses',
    data: resData,
  });
});

// fetch meals

// const mealsData = new Meals.find();
// console.log(mealsData);

// const silence = new Meals({ name: 'Silence' });
// console.log(silence);

/* api using from json file */

/*
const data = fs.readFileSync('./dev-data/data/tours.json', 'utf-8');
touresArr = JSON.parse(data);

app.get('/api/v1/tours', (req, res) => {
  console.log(req);
  res.status(200);
  res.json({
    noRecord: touresArr.length,
    name: touresArr,
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newTourId = touresArr[touresArr.length - 1]['_id'];
  console.log({ newTourId });
  const lastTour = touresArr[touresArr.length - 1];
  // const newTourId = touresArr[totalTours];
  // console.log(newTourId.id);
  // console.log(req.body);
  res.status(201);
  res.json({
    status: 'sucsses',
    data: lastTour,
  });
});

*/
// Lisning and starting Server
const portNumber = 3000;
// app.listen(portNumber,'127.0.0.1' ,() => {
app.listen(portNumber, () => {
  console.log(`Server Running on port No ${portNumber}.... `);
});
// console.log(data);
