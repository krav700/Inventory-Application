const { Router } = require("express");
const categoryController = require("../controllers/categoryController")

const categoryRouter = Router();

categoryRouter.get("/{*splat}", categoryController.getCategoryParts);

module.exports = categoryRouter;