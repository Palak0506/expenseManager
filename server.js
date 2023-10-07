const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const colors=require("colors");
const connectDB=require('./config/connectDB');

dotenv.config();
connectDB();

const app=express()
app.use(express.json())
app.use(cors())
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transaction routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

const PORT= 3001||process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })