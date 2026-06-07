#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();

const SQL = `
DROP TABLE parts_categories;
DROP TABLE categories;
DROP TABLE pc_parts;
`;


async function main() {
    console.log("deleting...");
    const client = new Client({
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();