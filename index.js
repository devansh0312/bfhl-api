const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

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
      if (String(item).trim() === '') continue;

      if (!isNaN(Number(item)) && isFinite(Number(item))) {
        const num = Number(item);
        if (num % 2 === 0) {
          even_numbers.push(String(item));
        } else {
          odd_numbers.push(String(item));
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaChars += item;
      } else {
        special_characters.push(String(item));
      }
    }

    const reversedAlpha = alphaChars.split('').reverse().join('');
    const concat_string = reversedAlpha.split('').map((char, index) =>
        index % 2 !== 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');

    const responsePayload = {
      is_success: true,
      // ↓↓↓ IMPORTANT: REPLACE THESE VALUES WITH YOUR OWN ↓↓↓
      user_id: "dev_agr_03122003", 
      email: "devanshagrawal@gmail.com",
      roll_number: "EFGH456",
      
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    };

    return res.status(200).json(responsePayload);

  } catch (error) {
    return res.status(500).json({ is_success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});