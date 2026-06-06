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
        .withMessage(`Category must be between 3 and 50 characters.`)
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

// async function newMessage(req, res) {
//     res.render("new", {});
// }

// const insertMessage = [
//     validateUser,
//     async (req, res) => {
//         const { message, username } = req.body;

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).render("new", {
//                 message: message,
//                 username: username,
//                 errors: errors.array(),
//             });
//         }

//         await db.insertMessage(message, username);
//         res.redirect("/");
//     },
// ];

// exports.usersUpdatePost = [
//     validateUser,
//     (req, res) => {
//         const user = usersStorage.getUser(req.params.id);
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).render("updateUser", {
//                 title: "Update user",
//                 user: user,
//                 errors: errors.array(),
//             });
//         }
//         const { firstName, lastName, email, age, bio } = matchedData(req);
//         usersStorage.updateUser(req.params.id, {
//             firstName,
//             lastName,
//             email,
//             age,
//             bio,
//         });
//         res.redirect("/");
//     },
// ];

// async function getMessageById(req, res) {
//     const id = req.params.messageId;
//     const messageById = await db.getMessageById(id);
//     res.render("messages/messageId", { message: messageById });
// }

// async function deleteAllMessages(req, res) {
//     await db.deleteAllMessages();
//     res.redirect("/");
// }

module.exports = {
    getCategoryParts,
    newCategory,
    insertCategory,
    newCategoryPart,
    insertCategoryPart,
    // getMessages,
    // newMessage,
    // getMessageById,
    // insertMessage,
    // deleteAllMessages,
};
