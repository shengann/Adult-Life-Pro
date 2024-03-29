import express from 'express';
const router = express.Router();
import { createExpense, deleteExpense, getAllExpense, updateExpense } from '../modules/expenses/expensesController.js'

router.route("/").post(createExpense).get(getAllExpense)
router.route('/:id').delete(deleteExpense).patch(updateExpense)


export default router