const express=require('express');
const expense=require('../controller/expensecontroller');
const router=express.Router();

router.post('/expense', expense.createtracker);
router.put('/expense/:id', expense.editTracker);
router.delete('/expense/:id', expense.deletetracker );
router.get('/expense', expense.getallexpense);

module.exports = router;