const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const User = require('./models/User');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/", (req, res, next) => {
    console.log("Req Body is", req.body);
  
    const { name, phn, email } = req.body;
  
    User.create({ name: name, email: email, phone: phn })
      .then(data => {
        res.status(200).json({ newUserDetail: data });
      })
      .catch(err => {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
});
  
app.get('/giveAllData', async (req, res, next) => {
  try {
    const result = await User.findAll();
    res.status(200).json(result); // Use status 200 for a successful response
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: 'An error occurred while fetching data' }); // Handle errors
  }
});

app.delete('/delete-user/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      console.log("Id is missing");
      return res.status(400).json({ err: 'Id is missing' }); // Return a response and exit the function
    }
    
    const uId = req.params.id;
    console.log("UID IS ",uId);
    await User.destroy({ where: { id: uId } });

    res.status(200).json({ message: 'User deleted successfully' }); // Sending a success response
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
