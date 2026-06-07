const { Router } = require("express");
const partsController = require("../controllers/partsController.js")

const partsRouter = Router();

partsRouter.get("/{*splat}/edit", partsController.editPartInfo);
partsRouter.post("/{*splat}/delete", partsController.deletePart);
partsRouter.post("/{*splat}/update", partsController.updatePartInfo);
partsRouter.get("/{*splat}", partsController.getPartInfo);

module.exports = partsRouter;