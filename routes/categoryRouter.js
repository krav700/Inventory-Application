const { Router } = require("express");
const indexController = require("../controllers/indexController");
const categoryController = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", indexController.getCategories);
categoryRouter.get("/new", categoryController.newCategory);
categoryRouter.post("/add", categoryController.insertCategory);
categoryRouter.get("/{*splat}/new", categoryController.newCategoryPart);
categoryRouter.post("/{*splat}/add", categoryController.insertCategoryPart);
categoryRouter.post(
    "/{*splat}/updateName",
    categoryController.updateCategoryName,
);
categoryRouter.post(
    "/{*splat}/deleteCategory",
    categoryController.deleteCategory,
);
categoryRouter.get("/{*splat}", categoryController.getCategoryParts);

module.exports = categoryRouter;
