const pool = require("./pool.js");

async function getCategories() {
    const { rows } = await pool.query("SELECT DISTINCT name FROM categories;");
    return rows;
}

async function getCategoryParts(category) {
    const { rows } = await pool.query(
        "SELECT p_p.name, p_p.price FROM pc_parts p_p JOIN parts_categories p_c ON p_c.part_id = p_p.id JOIN categories c ON p_c.category_id = c.id  WHERE c.name = $1;",
        [category],
    );
    return rows;
}

async function getPartInfo(part) {
    const { rows } = await pool.query(
        "SELECT p_p.name AS part_name, c.name AS category_name, p_p.price AS part_price, p_p.producer AS producer_name FROM pc_parts p_p JOIN parts_categories p_c ON p_c.part_id = p_p.id JOIN categories c ON c.id = p_c.category_id WHERE p_p.name = $1;",
        [part],
    );
    return rows;
}

async function insertCategory(categoryName) {
    await pool.query("INSERT INTO categories(name) VALUES($1)", [categoryName]);
}

async function insertPart(partName, partPrice, partProducer, partCategory) {
    await pool.query(
        "INSERT INTO pc_parts(name, price, producer) VALUES($1, $2, $3)",
        [partName, partPrice, partProducer],
    );
    await pool.query(
        "INSERT INTO parts_categories(part_id, category_id) SELECT pp.id, c.id FROM pc_parts pp JOIN categories c ON true WHERE pp.name = $1 AND c.name = $2",
        [partName, partCategory],
    );
}

async function editPart(oldPartName, newPartName, newPartPrice, newPartProducer) {
    await pool.query(
        "UPDATE pc_parts SET name = $1, price = $2, producer = $3 WHERE name = $4",
        [newPartName, newPartPrice, newPartProducer, oldPartName],
    );
}

module.exports = {
    getCategories,
    getCategoryParts,
    getPartInfo,
    insertCategory,
    insertPart,
    editPart,
};
