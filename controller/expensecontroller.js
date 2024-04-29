
const Tracker = require('../model/tracker');
const sequelize= require('../path/database');
exports.createtracker = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { expenseamount, description, category } = req.body;
        const userId = req.user.id;
        let totalexpense = req.user.totalexpense;
        let totalExpenseNum = parseInt(totalexpense || 0);
        const expenseAmountNum = parseInt(expenseamount);

      
            totalExpenseNum += expenseAmountNum;
  

        console.log(totalExpenseNum); 
        const expensedetails = await Tracker.create({ 
            expenseamount,
            description,
            category,
            userId
        }, { transaction: t });

        await req.user.update({ totalexpense: totalExpenseNum }, { transaction: t });

        await t.commit();

        res.status(201).json({ message: 'Expense created successfully', expense: expensedetails });
    } catch (err) {
        console.error(err);
        await t.rollback();
        res.status(500).json({ error: 'Failed to create expense' });
    }
};  

exports.getallexpense = async (req, res) => {
    try {
        const expenses = await Tracker.findAll({where : {userId: req.user.id}});
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
};

exports.deletetracker = async (req, res) => {
    try {
        const t = await sequelize.transaction();
        const id = req.params.id;
        const userId = req.user.id;
        const tracker = await Tracker.findByPk(id);
        if (!tracker || tracker.userId !== userId) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        const expenseAmount = tracker.expenseamount;
        console.log('deleting expense', expenseAmount);
        const totalExpenseNum = Number(req.user.totalexpense) - Number(expenseAmount);
        console.log('total deleting expense', totalExpenseNum);
        await req.user.update({ totalexpense: totalExpenseNum });
        await t.commit();
        await tracker.destroy();
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        await t.rollback();
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

