const User = require('../model/user');
const Expense = require('../model/tracker');
const sequelize = require('../path/database');

exports.getLeaderboard = async (req, res) => {
    try {
        console.log('Fetching leaderboard data...');
        const usersLeaderboard = await User.findAll({
            attributes: [
                'id',
                'username',
                'totalexpense'
            ],
            order: [['totalexpense', 'DESC']]
        });
        console.log(usersLeaderboard);
        res.status(200).json({ success: true, leaderboard: usersLeaderboard });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
