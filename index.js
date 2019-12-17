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

app.use(cors());
app.use(jsonParser);
app.use(loginRouter);
app.use(signUpRouter);
app.use(gameroomRouter);

app.get("/test", (req, res) => {
  stream.send("test");
  res.send("hello");
});

app.get("/stream", (req, res) => {
  stream.init(req, res);
});

app.listen(port, console.log(`listening to port ${port}`));
