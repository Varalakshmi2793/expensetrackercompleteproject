const Tracker = require('../model/tracker');
const sequelize= require('../path/database');
const S3service= require('../services/S3services');
const UserServices= require('../services/userservices');
const fileUrl = require('../model/fileUrl');

exports.download = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await UserServices.getExpenses(req);
        const stringifyExpenses = JSON.stringify(expenses);
        const filename = `Tracker${req.user.id}/${new Date()}.txt`;
        
        const fileURL = await S3service.uploadtoS3(stringifyExpenses, filename);
        
        console.log('File URL:', fileURL);
        
        await fileurl.create({url:fileURL, userId: userId});
        res.status(200).json({ fileURL, success: true });
    } catch (err) {
        console.error('Error in file download:', err);
        res.status(500).json({ message: "Error in file download", error: err });
    }
};


exports.fetchUrls = async (req, res) => {
    try {
        const userId = req.user.id;
        const urlFiles = await fileUrl.findAll({ where: { userId } });
        if (urlFiles.length > 0) {
            res.status(200).json({ urlFiles, message: "URLs fetched from the database" });
        } else {
            res.status(404).json({ message: "No URLs found for the user" });
        }
    } catch (err) {
        console.error("Error fetching URLs:", err);
        res.status(500).json({ message: 'Failed to fetch URLs', error: err });
    }
};

exports.createtracker = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { expenseamount, description, category } = req.body;
        const userId = req.user.id;
        let totalexpense = req.user.totalexpense;
        let totalExpenseNum = parseInt(totalexpense || 0);
        const expenseAmountNum = parseInt(expenseamount);

      
        totalExpenseNum += expenseAmountNum;
  
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

