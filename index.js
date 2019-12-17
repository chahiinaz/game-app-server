const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const signUpRouter = require("./signup/router");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const loginRouter = require("./login/router");
const Sse = require("json-sse");
const stream = new Sse();
const gameroomFactory = require("./gameroom/router");
const gameroomRouter = gameroomFactory(stream);
const Gameroom = require("./gameroom/model");

app.use(cors());
app.use(jsonParser);
app.use(loginRouter);
app.use(signUpRouter);
app.use(gameroomRouter);

app.get("/test", (req, res) => {
  stream.send("test");
  res.send("hello");
});

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
    next(error);
  }
});

app.listen(port, console.log(`listening to port ${port}`));
