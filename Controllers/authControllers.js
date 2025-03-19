const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const error  = require('console');


exports.signup = async (req, res) => {
    try {
        const{ fullname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        

      const result = await pool.query('INSERT INTO Users(fullname, email, password) VALUES(?, ?, ?)', [fullname, email, hashedPassword]);
        res.status(201).json({ message: "User registered succssfully", userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Error signing up user.", error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

       const [rows] = await pool.query('SELECT * FROM Users WHERE email = ?', [email]);
       const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
       
        const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password." });
            }


        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ message: "User logged in successfully.", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user.", error: error.message });
    }
};