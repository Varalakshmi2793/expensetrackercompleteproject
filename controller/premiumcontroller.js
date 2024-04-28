const User = require('../model/user');
const Expense = require('../model/tracker');

exports.getLeaderboard = async (req, res) => {
    try {
        console.log('Fetching leaderboard data...');
        const users = await User.findAll();
        const expenses = await Expense.findAll();

        console.log('Users:', users); // Log the users data
        console.log('Expenses:', expenses);
        
        // Initialize userAggregatedExpenses with each user's total expense as 0
        const userAggregatedExpenses = {};
        users.forEach((user) => {
            userAggregatedExpenses[user.id] = 0;
        });

        // Aggregate expenses for each user
        expenses.forEach((expense) => {
            userAggregatedExpenses[expense.userId] += expense.expenseamount;
        });

        // Create leaderboard array with user names and total expenses
        const leaderboard = users.map((user) => ({
            name: user.username,
            total: userAggregatedExpenses[user.id]
        })).sort((a, b) => b.total - a.total);
        
        res.status(200).json({ success: true, leaderboard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
