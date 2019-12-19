const { Router } = require("express");
const User = require("./model");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("../login/jwt");

function factory(stream) {
  const router = new Router();

  router.post("/signup", (req, res, next) => {
    if (!req.body.password || req.body.password.length === 0) {
      return res.status(400).send({ message: "please include a password" });
    }
    const userToCreate = {
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    User.create(userToCreate)
      .then(user => {
        const jwt = toJWT({ userId: user.id });
        res.json({ jwt, name: user.name });
      })
      .catch(error => next(error));
  });

  return router;
}

module.exports = factory;
