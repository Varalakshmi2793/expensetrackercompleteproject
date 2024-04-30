const Tracker = require('../model/tracker');


exports.getExpenses= (req) =>{
    return Tracker.findAll({where : {userId: req.user.id}});
}