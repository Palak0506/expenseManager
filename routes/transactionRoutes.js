const express=require("express");
const { addAllTransactions, getAllTransactions } = require("../controller/transactionController");

const router= express.Router();
router.post('/add-transaction',addAllTransactions);
router.post('/get-transaction',getAllTransactions);
module.exports=router;