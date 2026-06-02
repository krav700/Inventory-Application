#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS pc_parts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    category VARCHAR ( 255 ),
    price NUMERIC ( 10, 2 )
);

CREATE TABLE IF NOT EXISTS parts_producers (
    part_id INTEGER,
    producer_id INTEGER
);

CREATE TABLE IF NOT EXISTS producers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    producer_name VARCHAR ( 255 )
);

INSERT INTO pc_parts (name, category, price) VALUES
('AMD Ryzen 5 5600X', 'CPU', 199.99),
('Intel Core i7-12700K', 'CPU', 289.99),
('AMD Ryzen 9 5900X', 'CPU', 349.99),

('NVIDIA GeForce RTX 3060', 'GPU', 299.99),
('NVIDIA GeForce RTX 4070', 'GPU', 549.99),
('AMD Radeon RX 6700 XT', 'GPU', 329.99),

('Corsair Vengeance LPX 16GB DDR4', 'RAM', 89.99),
('G.Skill Trident Z Neo 32GB DDR4', 'RAM', 139.99),
('Kingston Fury Beast 16GB DDR5', 'RAM', 119.99),

('Samsung 980 Pro 1TB NVMe SSD', 'Storage', 119.99),
('Western Digital Blue 2TB HDD', 'Storage', 69.99),
('Crucial P3 Plus 500GB NVMe SSD', 'Storage', 44.99),

('ASUS ROG Strix B550-F Gaming', 'Motherboard', 159.99),
('MSI MPG B550 Carbon WiFi', 'Motherboard', 199.99),
('Gigabyte Z690 Aorus Elite', 'Motherboard', 229.99),

('EVGA 750W 80+ Gold PSU', 'Power Supply', 129.99),
('Corsair RM850x 850W 80+ Gold', 'Power Supply', 159.99),
('SeaSonic Focus 650W 80+ Platinum', 'Power Supply', 119.99),

('Cooler Master Hyper 212', 'CPU Cooler', 44.99),
('Noctua NH-D15', 'CPU Cooler', 99.99),
('ARCTIC Freezer 34 eSports', 'CPU Cooler', 49.99),

('Lian Li LANCOOL 215', 'Case', 99.99),
('Fractal Design Meshify C', 'Case', 109.99),
('Corsair 4000D Airflow', 'Case', 94.99),

('Noctua NF-A12x25 PWM', 'Case Fan', 32.95),
('ARCTIC P12 PWM PST', 'Case Fan', 12.99),
('Corsair ML120 Pro', 'Case Fan', 24.99);

INSERT INTO producers (producer_name) VALUES
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
            rejectUnauthorized: false
        }
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();