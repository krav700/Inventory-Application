const pool = require("./pool.js");

async function getCategories() {
    const { rows } = await pool.query('SELECT DISTINCT name FROM categories;');
    return rows;
}

async function getCategoryParts(category) {
    const { rows } = await pool.query('SELECT p_p.name, p_p.price FROM pc_parts p_p JOIN parts_categories p_c ON p_c.part_id = p_p.id JOIN categories c ON p_c.category_id = c.id  WHERE c.name = $1;', [category]);
    return rows;
}

async function getPartInfo(part) {
    const { rows } = await pool.query('SELECT p_p.name AS part_name, c.name AS category_name, p_p.price AS part_price, producers.name AS producer_name FROM pc_parts p_p JOIN parts_producers ON p_p.id = parts_producers.part_id JOIN producers ON parts_producers.producer_id = producers.id JOIN parts_categories p_c ON p_c.part_id = p_p.id JOIN categories c ON c.id = p_c.category_id WHERE p_p.name = $1;', [part]);
    return rows;
}

module.exports = {
    getCategories,
    getCategoryParts,
    getPartInfo,
}