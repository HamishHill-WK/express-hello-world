const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 8080;

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
};

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json()); // This is crucial for parsing JSON request bodies

// Routes
app.get("/api", (req, res) => {
  res.json({fruits: ["apple", "orange", "banana"]});
});

app.post('/api/endpoint', (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);
  
  // Process the data here
  
  res.json({ status: 'Data received successfully', data: receivedData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Separate function for making API calls
const fetchAPI = async () => {
  try {
    const response = await axios.get("https://express-hello-world-1-o7v2.onrender.com/api");
    console.log("Fetched data:", response.data.fruits);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

// Call fetchAPI if needed
fetchAPI();