const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const emptyErr = "must not be empty.";
const lengthErr = "must be betweeen 1 and 10 characters.";

const validateCategory = [
    body("categoryName")
        .trim()
        .notEmpty()
        .withMessage(`Category Name ${emptyErr}`)
        .isLength({ min: 3, max: 50 })
        .withMessage(`Category must be between 3 and 50 characters.`),
];
const validatePart = [
    body("partName")
        .trim()
        .notEmpty()
        .withMessage(`Part Name ${emptyErr}`)
        .isLength({ min: 3, max: 255 })
        .withMessage(`Part Name must be between 3 and 255 characters.`),
    body("partPrice")
        .isNumeric()
        .withMessage(`Part Price must be a number`)
        .notEmpty()
        .withMessage(`Part Price ${emptyErr}`),
    body("partProducer")
        .trim()
        .notEmpty()
        .withMessage(`Part Price ${emptyErr}`)
        .isLength({ min: 3, max: 50 })
        .withMessage(`Part Producer must be between 3 and 50 characters.`),
];

async function getCategoryParts(req, res) {
    const category = req.params.splat[0];
    const categoryParts = await db.getCategoryParts(category);
    if (!categoryParts) {
        return res.render("components/categoryParts");
    }
    return res.render("components/categoryParts", {
        parts: categoryParts,
        category,
    });
}

async function newCategory(req, res) {
    res.render("forms/addCategory");
}

const insertCategory = [
    validateCategory,
    async (req, res) => {
        const { categoryName } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("forms/addCategory", {
                categoryName: categoryName,
                errors: errors.array(),
            });
        }

        await db.insertCategory(categoryName);
        res.redirect("/");
    },
];

async function newCategoryPart(req, res) {
    const partCategory = req.params.splat[0];
    res.render("forms/addPart", { partCategory });
}

const insertCategoryPart = [
    validatePart,
    async (req, res) => {
        const { partName, partPrice, partProducer, partCategory } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render(`forms/addPart`, {
                partName,
                partPrice,
                partProducer,
                partCategory,
                errors: errors.array(),
            });
        }

        await db.insertPart(partName, partPrice, partProducer, partCategory);
        res.redirect(`/category/${partCategory}`);
    },
];

async function updateCategoryName(req, res) {
    if (!req.session.auth) {
        return res.render("forms/authUser");
    }
    const { oldCategoryName, newCategoryName } = req.body;
    await db.updateCategoryName(oldCategoryName, newCategoryName);
    res.redirect(`/category/${newCategoryName}`);
}

async function deleteCategory(req, res) {
    if (!req.session.auth) {
        return res.render("forms/authUser");
    }
    const categoryName = req.params.splat[0];
    const categoryInfo = await db.getCategoryInfo(categoryName);
    const { categoryid } = categoryInfo[0];
    await db.deleteCategory(categoryid);
    res.redirect("/");
}

module.exports = {
    getCategoryParts,
    newCategory,
    insertCategory,
    newCategoryPart,
    insertCategoryPart,
    updateCategoryName,
    deleteCategory,
};
