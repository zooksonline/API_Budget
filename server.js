const express = require("express");
const cors = require("cors");
const app = express();

const config = require("config");
const port = config.get("portENV");

// CORS
app.use(cors());
// Body-Parser Middleware
app.use(express.json());

auth = require("./routes/api/auth");
app.use("/api/user", auth);

// app.listen(port);
app.listen(port, () => console.log(`Server ทำงานอยู่ที่ Port ${port}`));
