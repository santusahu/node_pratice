const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const { stringify } = require('querystring');

// monogo db connection
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

// meals schema
const schema = {
  id: Number,
  name: String,
  discription: String,
  price: Number,
};

const orderSchema = {
  userDetails: Object,
  orderDetails: Array,
};

const Meals = mongoose.model('meals', schema);
const Orders = mongoose.model('orders', orderSchema);

// save orders

app.post('/foa/v1/orders', async (req, res) => {
    const saveData = new Orders({
      userDetails: req.body.userDetails,
      orderDetails: req.body.orderDetails
    });

    const resData = await saveData.save();
    console.log(req.body.userDetails);
    console.log(req.body.orderDetails);

    res.json({
      status: 'sucsses',
      data: resData,
    });
  }
);

//fetch all meals
app.get('/meals', async (req, res) => {
  console.log(req);
  // res.json({
  //   status: 'sucsses',
  // });
  const mealsData = Meals.find({}, (err, meals) => {
    if (err) {
      console.error(err);
    }
    res.json({
      status: 'sucsses',
      data: meals,
    });
    // console.warn(mealsData);
    console.warn(meals);
  });
});

//   Save new meals
app.post('/meals', async (req, res) => {
  const data = new Meals({
    id: req.body.id,
    name: req.body.name,
    discription: req.body.discription,
    price: req.body.price,
  });

  const resData = await data.save();
  // console.log({resData});
  console.log(req.body);
  res.json({
    status: 'sucsses',
    data: resData,
  });
});

const portNumber = 3000;
// app.listen(portNumber,'127.0.0.1' ,() => {
app.listen(portNumber, () => {
  console.log(`Server Running on port No ${portNumber}.... `);
});
// console.log(data);
