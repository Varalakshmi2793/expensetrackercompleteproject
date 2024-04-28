const User = require('../model/user');
const Expense = require('../model/tracker');
const sequelize = require('../path/database');
const { Sequelize } = require('sequelize');

exports.getLeaderboard = async (req, res) => {
    try {
        console.log('Fetching leaderboard data...');
        const usersleaderboard = await User.findAll({
            attributes: [
                'id',
                'username',
                [sequelize.fn('SUM', sequelize.col('expensetrackers.expenseamount')), 'total'] // Adjusted alias to match association
            ],
            include: [
                {
                    model: Expense,
                    
                    attributes: [] 
                }
            ],
            group: ['User.id'], 
            order: [[Sequelize.literal('total'), 'DESC']] 
        });

        console.log(usersleaderboard);

        res.status(200).json({ success: true, leaderboard: usersleaderboard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
