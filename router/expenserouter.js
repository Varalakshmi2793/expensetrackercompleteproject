const express=require('express');
const expense=require('../controller/expensecontroller');
const router=express.Router();
const authenticate=require('../middleware/auth');

router.post('/expense/addexpense',authenticate.authenticateToken, expense.createtracker);
router.get('/expense/getexpense', authenticate.authenticateToken, expense.getallexpense);
router.delete('/expense/delexpense/:id', authenticate.authenticateToken, expense.deletetracker );
module.exports = router;