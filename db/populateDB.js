#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS pc_parts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    price NUMERIC ( 10, 2 )
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 50 )
);

CREATE TABLE IF NOT EXISTS parts_categories (
    part_id INTEGER REFERENCES pc_parts(id),
    category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS producers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS parts_producers (
    part_id INTEGER REFERENCES pc_parts(id),
    producer_id INTEGER REFERENCES producers(id)
);

INSERT INTO categories (name) VALUES
('CPU'),
('GPU'),
('RAM'),
('Storage'),
('Motherboard'),
('Power Supply'),
('CPU Cooler'),
('Case'),
('Case Fan');

INSERT INTO pc_parts (name, price) VALUES
('AMD Ryzen 5 5600X', 199.99),
('Intel Core i7-12700K', 289.99),
('AMD Ryzen 9 5900X', 349.99),

('NVIDIA GeForce RTX 3060', 299.99),
('NVIDIA GeForce RTX 4070', 549.99),
('AMD Radeon RX 6700 XT', 329.99),

('Corsair Vengeance LPX 16GB DDR4', 89.99),
('G.Skill Trident Z Neo 32GB DDR4', 139.99),
('Kingston Fury Beast 16GB DDR5', 119.99),

('Samsung 980 Pro 1TB NVMe SSD', 119.99),
('Western Digital Blue 2TB HDD', 69.99),
('Crucial P3 Plus 500GB NVMe SSD', 44.99),

('ASUS ROG Strix B550-F Gaming', 159.99),
('MSI MPG B550 Carbon WiFi', 199.99),
('Gigabyte Z690 Aorus Elite', 229.99),

('EVGA 750W 80+ Gold PSU', 129.99),
('Corsair RM850x 850W 80+ Gold', 159.99),
('SeaSonic Focus 650W 80+ Platinum', 119.99),

('Cooler Master Hyper 212', 44.99),
('Noctua NH-D15', 99.99),
('ARCTIC Freezer 34 eSports', 49.99),

('Lian Li LANCOOL 215', 99.99),
('Fractal Design Meshify C', 109.99),
('Corsair 4000D Airflow', 94.99),

('Noctua NF-A12x25 PWM', 32.95),
('ARCTIC P12 PWM PST', 12.99),
('Corsair ML120 Pro', 24.99);

INSERT INTO parts_categories (part_id, category_id) VALUES
(1, 1), (2, 1), (3, 1),
(4, 2), (5, 2), (6, 2),
(7, 3), (8, 3), (9, 3),
(10, 4), (11, 4), (12, 4),
(13, 5), (14, 5), (15, 5),
(16, 6), (17, 6), (18, 6),
(19, 7), (20, 7), (21, 7),
(22, 8), (23, 8), (24, 8),
(25, 9), (26, 9), (27, 9);

INSERT INTO producers (name) VALUES
('AMD'),
('Intel'),
('NVIDIA'),
('Corsair'),
('Samsung'),
('Western Digital'),
('Crucial'),
('ASUS'),
('MSI'),
('Gigabyte'),
('EVGA'),
('SeaSonic'),
('Cooler Master'),
('Noctua'),
('ARCTIC'),
('Lian Li'),
('Fractal Design'),
('G.Skill'),
('Kingston');

INSERT INTO parts_producers (part_id, producer_id) VALUES
(1, 1), (2, 2), (3, 1), (4, 3), (5, 3), (6, 1), (7, 4), (8, 18), (9, 19),
(10, 5), (11, 6), (12, 7), (13, 8), (14, 9), (15, 10), (16, 11), (17, 4),
(18, 12), (19, 13), (20, 14), (21, 15), (22, 16), (23, 17), (24, 4),
(25, 14), (26, 15), (27, 4);
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false,
        },
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
