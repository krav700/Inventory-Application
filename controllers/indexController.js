const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
    body("adminPassword")
        .trim()
        .notEmpty()
        .withMessage(`User password must not be empty.`)
        .equals("admin")
        .withMessage(`User password is incorect.`)
];

async function getCategories(req, res) {
    const categories = await db.getCategories();
    if (!categories) {
        return res.render("index", { title: "Inventory Application" });
    }
    return res.render("index", {
        title: "Inventory Application",
        categories: categories,
    });
}

const authUser = [
    validateUser,
    async (req, res) => {
        const { adminPassword } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("forms/authUser", {
                errors: errors.array(),
            });
        }

        req.session.auth = "approved";
        const backUrl = req.get('Referrer') || '/';
        res.redirect(backUrl);
    },
];

module.exports = {
    getCategories,
    authUser
};
