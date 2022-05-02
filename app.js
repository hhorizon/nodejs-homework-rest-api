const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");
const limiter = require("./middlewares/rate-limit");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(limiter(15 * 60 * 1000, 100));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static(process.env.STATIC_FOLDER));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
