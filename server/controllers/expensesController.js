import Expense from '../models/expensesModel.js';

const createExpense = async (req, res) => {
    const { date, amount, category } = req.body

    if (!amount || !category || !date) {
        res.status(400)
        throw new Error('Please Provide all values')
    }
    const expense = await Expense.create(req.body)
    res.status(200).json({ expense })

};

const getAllExpense = async (req, res) => {
    const expenses = await Expense.find({})
    const groupedExpenses = [];

    for (const expense of expenses) {
        const date = new Date(expense.date).toDateString();
        if (!groupedExpenses[date]) {
            groupedExpenses[date] = [];
        }

        groupedExpenses[date].push(expense);
    }
    
    //the output of the groupedExpenses will be:
    // {date: [{expense}],date: [{expense}],date: [{expense}]...} 
    //the output of the Object.entries(groupedExpenses):
    // [date,[{expense},{expense}]],[date,[{expense},{expense}]]
    const formattedExpenses = [];
    for (const [date, dayExpenses] of Object.entries(groupedExpenses)) {
        const totalExpense = dayExpenses.reduce((total, expense) => total + expense.amount, 0);

        formattedExpenses.push({
            date,
            items: dayExpenses,
            totalExpense,
        });
    }

    res.status(200).json(formattedExpenses);

};

const updateExpense = async (req, res) => {
    const { id: expenseId } = req.params
    const { amount, category, date } = req.body

    if (!amount || !category || !date) {
        res.status(400)
        throw new Error('Please Provide all values')
    }
    const expense = await Expense.findById({ expenseId });

    if (!expense) {
        res.status(400)
        throw new Error('Expense not found')
    }
    const updatedExpense = await Expense.findOneAndUpdate({ _id: expenseId }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ updatedExpense })

};

const deleteExpense = async (req, res) => {
    const { id: expenseId } = req.params
    const expense = await Expense.findById({ expenseId });

    if (!expense) {
        res.status(400)
        throw new Error('Expense not found');
    }
    await expense.deleteOne()
    res.status(200).json({ expense })

};

export { createExpense, deleteExpense, getAllExpense, updateExpense };
