const express=require('express');
const expense=require('../controller/expensecontroller');
const router=express.Router();
const authenticateToken = require('../middleware/authenticate');

router.post('/expense/addexpense', authenticateToken, expense.createtracker);
router.delete('/expense/addexpense/:id', authenticateToken, expense.deletetracker);
router.get('/expense/addexpense', authenticateToken, expense.getallexpense);

module.exports = router;