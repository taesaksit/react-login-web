const express = require('express');
const axios = require('axios');

const router = express.Router();



// Line Notify route
router.post('/notify', async (req, res) => {
    const token = process.env.LINE_TOKEN; // Add your Line Notify Token in .env
    const  {message}  = req.body; // Assuming the message is sent in the request body
    console.log(message);
    try {
        const response = await axios({
            method: "POST",
            url: "https://notify-api.line.me/api/notify",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + token
            },
            data: `message=${message}`,
        });

        res.status(200).json({
            message: 'Notification sent successfully',
            response: response.data
        });

    } catch (error) {
        console.error('Error sending Line Notify:', error);
        res.status(500).json({ message: 'Error sending notification' });
    }
});





module.exports = router;