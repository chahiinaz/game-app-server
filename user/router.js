const { Router } = require("express");

const User = require("./model");

function factory(stream) {
  const router = new Router();

  router.post("/user", async (request, response, next) => {
    try {
      const user = await User.create(request.body);

      response.send(user);
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = factory;
