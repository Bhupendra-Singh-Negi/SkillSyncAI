import app from "./src/app.js";
import dotenv from 'dotenv';
dotenv.config();
import db from "./src/config/db.js";

// Connect to the database
db();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
