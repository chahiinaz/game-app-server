const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Sse = require("json-sse");

const Gameroom = require("./gameroom/model");
const User = require("./signup/model");

const signUpFactory = require("./signup/router");
const loginRouter = require("./login/router");

const gameroomFactory = require("./gameroom/router");

const joinFactory = require("./join/router");

const jsonParser = bodyParser.json();
const app = express();

const port = process.env.PORT || 4000;

app.use(jsonParser);
app.use(cors());

const stream = new Sse();

const gameroomRouter = gameroomFactory(stream);
app.use(gameroomRouter);

app.use(loginRouter);

const signUpRouter = signUpFactory(stream);
app.use(signUpRouter);

const joinRouter = joinFactory(stream);
app.use(joinRouter);

// app.get("/test", (req, res) => {
//   stream.send("test");
//   res.send("hello");
// });

app.get("/stream", async (req, res, next) => {
  try {
    const gamerooms = await Gameroom.findAll();

    const action = {
      type: "ALL_GAMEROOMS",
      payload: gamerooms
    };
    const string = JSON.stringify(action);

    stream.updateInit(string);
    stream.init(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.listen(port, console.log(`listening to port ${port}`));
