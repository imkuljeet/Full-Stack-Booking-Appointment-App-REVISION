const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/", userController.addUser);

router.get('/giveAllData', userController.getUser);

router.delete('/delete-user/:id', userController.deleteUser);
  

module.exports = router;