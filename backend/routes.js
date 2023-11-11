const express = require('express');
const router = express.Router();

const { Pool } = require('pg');



const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};

// Define routes
router.post('/login', async (req, res) => {
  const username = req.body.user;
  const userPwd = req.body.pwd;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, userPwd]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');

    res.send(`Details of user ${userId}`);
  }

});

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
