var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var config = require("./configSys");

var itemRouter = require("./routes/itemRouter");
var userRouter = require("./routes/userRouter");
var categoryRouter = require("./routes/categoryRouter");
var characterRouter = require("./routes/characterRouter");
var flashsaleRouter = require("./routes/flashsaleRouter");
var bidRouter = require("./routes/bidRouter");
var useritemRouter = require("./routes/useritemRouter");
var usercharacterRouter = require("./routes/usercharacterRouter");
var xpRouter = require("./routes/xpRouter");
var logRouter = require("./routes/logRouter");
var gameRouter = require("./routes/gameRouter");

var app = express();
// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname)));

mongoose.connect(config.MONGODB_URL, {
  user: config.MONGODB_USER,
  pass: config.MONGODB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use("/", itemRouter);
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", characterRouter);
app.use("/", flashsaleRouter);
app.use("/", useritemRouter);
app.use("/", usercharacterRouter);
app.use("/", bidRouter);
app.use("/", xpRouter);
app.use("/", logRouter);
app.use("/", gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
