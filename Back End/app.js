const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const shopRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(shopRoutes);


sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
