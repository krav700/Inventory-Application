const db = require("../db/queries");

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
    getCategories,
    // getMessages,
    // newMessage,
    // getMessageById,
    // insertMessage,
    // deleteAllMessages,
};
