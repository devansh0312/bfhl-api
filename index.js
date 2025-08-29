// File: bfhl-api/index.js

const express = require('express');
const cors = require('cors');

const app = express();

// --- CRITICAL SECTION ---
// These must be included and in this order.
app.use(cors());
app.use(express.json());
// ------------------------

const PORT = process.env.PORT || 3001;

// --- VERIFY THIS ROUTE NAME ---
// It must be exactly app.post('/bfhl', ...)
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Input 'data' must be an array." });
    }

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphaChars = '';

    for (const item of data) {
        const strItem = String(item).trim();
        if (strItem === '') continue;

        if (!isNaN(Number(strItem)) && isFinite(Number(strItem))) {
            const num = Number(strItem);
            if (num % 2 === 0) {
                even_numbers.push(String(num));
            } else {
                odd_numbers.push(String(num));
            }
            sum += num;
        } else if (/^[a-zA-Z]+$/.test(strItem)) {
            alphabets.push(strItem.toUpperCase());
            alphaChars += strItem;
        } else {
            special_characters.push(strItem);
        }
    }

    const reversedAlpha = alphaChars.split('').reverse().join('');
    const concat_string = reversedAlpha.split('').map((char, index) =>
        index % 2 !== 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');

    const responsePayload = {
      is_success: true,
      // ↓↓↓ IMPORTANT: MAKE SURE YOU HAVE REPLACED THESE! ↓↓↓
    user_id: "devansh0312", 
      email: "devansha625@gmail.com",
      roll_number: "EFGH456",
      
      // ↑↑↑ --------------------------------------------- ↑↑↑
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    };

    return res.status(200).json(responsePayload);

  } catch (error) {
    console.error(error); // Log the error for debugging on Vercel
    return res.status(500).json({ is_success: false, error: error.message });
  }
});

// This makes sure the server starts
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});