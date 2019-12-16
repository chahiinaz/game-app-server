const { Router } = require("express");
const router = new Router();
const User = require("./model");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
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