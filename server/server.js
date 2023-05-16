const express = require("express");
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT;
    
require("./config/mongoose.config");
    
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));
    
const AllMyUserRoutes = require("./routes/product.routes");
AllMyUserRoutes(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );

