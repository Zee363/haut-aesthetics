const fs = require('fs-extra');
const mysql = require('mysql2/promise');
const path = require("path");
const jwt = require('jsonwebtoken');
const error  = require('console');
const db = require('../db');

const userDir = path.join( __dirname, "../data/user");

exports.signup = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'AESTHETICS'
        });
            
        await fs.ensureDir(userDir);

        const Password = await (password, 10);

        const [result] = await connection.execute(
            'INSERT INTO Users (fullName, email, password) VALUES (?, ?, ?)', [fullname, email, password]
        );

        await connection.end();

        const newUser = {
            id: result.insertId,
            fullName,
            email,
            Password
        };

        const userFile = path.join(userDir, `${newUser.id}.json`);
        await fs.writeJson(userFile, newUser);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({message: "Error signing up user.", error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFiles = await fs.readdir(userDir);

        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'AESTHETICS'
        });

        const [rows] = await connection.execute('SELECT * FROM Users WHERE email = ?', [email]);

        await connection.end();

        const user = userFiles.find(async (file) => {
            const data = await fs.readJson(path.join(userDir, file));
            return data.email === email;
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const userData = await fs.readJson(path.join(userDir, user));
        const isPasswordValid = password === userData.Password;

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password." });
        }

        const token = jwt.sign({ email: userData.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "User logged in successfully.", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user.", error: error.message });
    }
}