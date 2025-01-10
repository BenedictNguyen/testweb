const express = require('express');
const mysql = require('mysql2'); // Use 'mysql2' for MySQL connection
const cors = require('cors');
const app = express();
const port = 5000;

// Setup MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sa',  // Replace with your username
  password: '12345689',  // Replace with your password
  database: 'UNIGLOBE' , // Replace with your database name
  port: 3306
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    return;
  }
  console.log('Successfully connected to the database');
});

// Setup CORS for React frontend to communicate with backend
app.use(cors());

// API to fetch introductory content
app.get('/api/intro', (req, res) => {
  const query = 'SELECT * FROM intro_content LIMIT 1';  // Get one row from the intro_content table

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Query error:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);  // Return data as JSON
  });
});

// Start the server on port 5000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});