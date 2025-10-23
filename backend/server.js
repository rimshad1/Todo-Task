const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const dotenv = require('dotenv');
const taskRouter = require('./routes/taskRoutes');

dotenv.config();
const app = express();
 app.use(express.json());
 app.use(cookieParser());
 app.use(express.urlencoded({ extended: true }));
 app.use(cors({
   origin: "http://localhost:3000",
   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
   credentials: true
 }));
 app.use('/api/task', taskRouter);


 app.get('/', (req, res) => {
    res.send('Api is working');
 })

 const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port:${PORT}`));