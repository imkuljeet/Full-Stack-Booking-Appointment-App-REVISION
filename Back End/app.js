const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const User = require('./models/User');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/", (req, res, next) => {
    console.log("Req Body is", req.body);
  
    const { username, phn, email } = req.body;
  
    User.create({ name: username, email: email, phone: phn })
      .then(data => {
        res.status(200).json({ newUserDetail: data });
      })
      .catch(err => {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
});
  

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
