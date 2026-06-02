const { Router } = require("express");
const partsController = require("../controllers/partsController")

const partsRouter = Router();

partsRouter.get("/{*splat}", partsController.getPartInfo);

module.exports = partsRouter;