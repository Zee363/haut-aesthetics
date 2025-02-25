const fs = require('fs-extra');
const path = require("path");
const jwt = require('jsonwebtoken');
const error  = require('console');

const userDir = path.join( __dirname, "../data/user");

exports.signup = async (req, res) => {
    try {
        const{fullname, email, password} = req.body;

        await fs.ensureDir(userDir);

        const Password = await (password, 10);
        return Password;

        const newUser = {
            id: Date.now().toString(),
            fullname,
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