const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const emptyErr = "must not be empty.";
const lengthErr = "must be betweeen 1 and 10 characters.";

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

async function getPartInfo(req, res) {
    const part = req.params.splat[0];
    const partInfo = await db.getPartInfo(part);
    if (!partInfo) {
        return res.render("components/partInfo");
    }
    return res.render("components/partInfo", { parts: partInfo });
}

async function editPartInfo(req, res) {
    if (!req.session.auth) {
        return res.render("forms/authUser");
    }
    const part = req.params.splat[0];
    const partInfo = await db.getPartInfo(part);
    const { part_name, part_price, category_name, producer_name } = partInfo[0];
    res.render("forms/editPart", { oldPartName: part_name, partName: part_name, partPrice: part_price, partCategory: category_name, partProducer: producer_name });
}


const updatePartInfo = [
    validatePart,
    async (req, res) => {
        const { oldPartName, partName, partPrice, partProducer } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render(`forms/editPart`, {
                oldPartName,
                partName, 
                partPrice,
                partProducer,
                errors: errors.array(),
            });
        }
        await db.editPart(oldPartName ,partName, partPrice, partProducer);
        res.redirect(`/parts/${partName}`);
    },
];

async function deletePart(req, res) {
    if (!req.session.auth) {
        return res.render("forms/authUser");
    }
    const part = req.params.splat[0];
    const partInfo = await db.getPartInfo(part);
    const { part_id, part_name, category_name } = partInfo[0];
    await db.deletePart(part_id);
    res.redirect(`/category/${category_name}`);
}

module.exports = {
    getPartInfo,
    editPartInfo,
    updatePartInfo,
    deletePart
};
