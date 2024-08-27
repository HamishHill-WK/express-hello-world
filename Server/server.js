const express = require('express');
const app = express();
const cors = require('cors');
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

