const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        const [result] = await pool.query('INSERT INTO users SET ? ', newUser);

        res.status(200).json({
            message: 'User registered successfully',
            user: result
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login for token
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // ต้องใช้ await ที่ pool.query เพื่อรอผลลัพธ์จากการ query ก่อน
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        // เช็คว่ามีผู้ใช้อยู่ในฐานข้อมูลหรือไม่
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];
        const isValidPassword = await bcrypt.compare(password, user.password);

        // เช็ครหัสผ่านว่า valid หรือไม่
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('Valid credentials', user.userID, user.username);

        // สร้าง token
        const token = jwt.sign(
            {
                userId: user.userID,
                username: user.username
            },
            process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: username });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
});


// Middleware สำหรับตรวจสอบการ login Token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(403).json({ message: 'No token provided' });
        }

        // แยก Bearer ออกจาก token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.username = decoded.username;

        next();
    } catch (err) {
        console.error('Token verification error:', err);

        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        res.status(500).json({ message: 'Failed to authenticate token' });
    }
};


// Protected route (ใช้ middleware ตรวจสอบ token)
router.get('/profile', verifyToken, async (req, res) => {
    try {

        const [rows] = await pool.query("SELECT username FROM users WHERE userID = ? ", [req.userId])

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});




module.exports = router;