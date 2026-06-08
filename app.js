const path = require("node:path");
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter.js");
const categoryRouter = require("./routes/categoryRouter.js");
const partsRouter = require("./routes/partsRouter.js");
const session = require("express-session");

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/parts", partsRouter);

const PORT = 3000;
app.listen(process.env.PORT ?? PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Inventory Application - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});
