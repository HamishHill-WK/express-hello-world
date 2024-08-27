const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

const fetchAPI = async () =>{
	const response = await axios.get("https://express-hello-world-1-o7v2.onrender.com/api");

	console.log(response.data.fruits);
}


const corsOptions ={
  origin:["http://localhost:5173"],
};

app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({fruits: [ "apple", "orange", "banaum"]});
});

app.listen(8080, () => {
  console.log('server running at http://localhost:8080');
});


fetchAPI();

