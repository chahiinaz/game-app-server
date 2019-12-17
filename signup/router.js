const { Router } = require("express");
const router = new Router();
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../login/jwt");

router.post("/signup", (req, res, next) => {
  console.log("body", req.body);
  const userToCreate = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 10)
  };

  User.create(userToCreate)
    .then(user => {
      const jwt = toJWT({ userId: user.id });
      res.json({ jwt });
    })
    .catch(error => next(error));
});

module.exports = router;
