const { where } = require('sequelize');
const Tracker = require('../model/tracker');

exports.createtracker = async (req, res) => {
    try {
        const { expenseamount, description, category } = req.body;
        const expensedetails = await Tracker.create({ 
            expenseamount,
            description,
            category
        });
        res.status(201).json({ message: 'Expense created successfully', expense: expensedetails });
    } catch (err) {
        console.error(err);
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
        const id = req.params.id;
        const tracker = await Tracker.findByPk(id);
        if (!tracker) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        await tracker.destroy();
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};