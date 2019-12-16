const { Router } = require("express");
const router = new Router();
const User = require("./model");
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
  console.log("body", req.body);
  const userToCreate = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.create(userToCreate)
    .then(user => {
      res.json(user);
    })
    .catch(error => next(error));
});

module.exports = router;
