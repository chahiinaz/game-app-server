const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const signUpRouter = require("./signup/router");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const loginRouter = require("./login/router");

app.use(cors());
app.use(jsonParser);
app.use(loginRouter);
app.use(signUpRouter);

app.listen(port, console.log(`listening to port ${port}`));
