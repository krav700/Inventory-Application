#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS pc_parts (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ),
    price NUMERIC ( 10, 2 ),
    producer VARCHAR ( 50 )
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 50 )
);

CREATE TABLE IF NOT EXISTS parts_categories (
    part_id INTEGER REFERENCES pc_parts(id),
    category_id INTEGER REFERENCES categories(id)
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

INSERT INTO pc_parts (name, price, producer) VALUES
('AMD Ryzen 5 5600X', 199.99, 'AMD'),
('Intel Core i7-12700K', 289.99, 'Intel'),
('AMD Ryzen 9 5900X', 349.99, 'AMD'),

('NVIDIA GeForce RTX 3060', 299.99, 'NVIDIA'),
('NVIDIA GeForce RTX 4070', 549.99, 'NVIDIA'),
('AMD Radeon RX 6700 XT', 329.99, 'AMD'),

('Corsair Vengeance LPX 16GB DDR4', 89.99, 'Corsair'),
('G.Skill Trident Z Neo 32GB DDR4', 139.99, 'G.Skill'),
('Kingston Fury Beast 16GB DDR5', 119.99, 'Kingston'),

('Samsung 980 Pro 1TB NVMe SSD', 119.99, 'Samsung'),
('Western Digital Blue 2TB HDD', 69.99, 'Western Digital'),
('Crucial P3 Plus 500GB NVMe SSD', 44.99, 'Crucial'),

('ASUS ROG Strix B550-F Gaming', 159.99, 'ASUS'),
('MSI MPG B550 Carbon WiFi', 199.99, 'MSI'),
('Gigabyte Z690 Aorus Elite', 229.99, 'Gigabyte'),

('EVGA 750W 80+ Gold PSU', 129.99, 'EVGA'),
('Corsair RM850x 850W 80+ Gold', 159.99, 'Corsair'),
('SeaSonic Focus 650W 80+ Platinum', 119.99, 'SeaSonic'),

('Cooler Master Hyper 212', 44.99, 'Cooler Master'),
('Noctua NH-D15', 99.99, 'Noctua'),
('ARCTIC Freezer 34 eSports', 49.99, 'ARCTIC'),

('Lian Li LANCOOL 215', 99.99, 'Lian Li'),
('Fractal Design Meshify C', 109.99, 'Fractal Design'),
('Corsair 4000D Airflow', 94.99, 'Corsair'),

('Noctua NF-A12x25 PWM', 32.95, 'Noctua'),
('ARCTIC P12 PWM PST', 12.99, 'ARCTIC'),
('Corsair ML120 Pro', 24.99, 'Corsair');

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
