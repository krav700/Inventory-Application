const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.getCategories);
indexRouter.post("/auth", indexController.authUser);

module.exports = indexRouter;
