const pool = require("./pool.js");

async function getCategories() {
    const { rows } = await pool.query('SELECT DISTINCT category FROM pc_parts;');
    return rows;
}

async function getCategoryParts(category) {
    const { rows } = await pool.query('SELECT * FROM pc_parts WHERE category = $1;', [category]);
    return rows;
}

async function getPartInfo(part) {
    const { rows } = await pool.query('SELECT pp.name, pp.category, pp.price, producers.producer_name FROM pc_parts pp JOIN parts_producers ON pp.id = parts_producers.part_id JOIN producers ON parts_producers.producer_id = producers.id WHERE pp.name = $1;', [part]);
    return rows;
}

module.exports = {
    getCategories,
    getCategoryParts,
    getPartInfo,
}