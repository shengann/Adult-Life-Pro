import express from 'express';
const router = express.Router();
import { createCashFlow, deleteCashFlow, getAllCashFlow, updateCashFlow } from '../modules/cashFlows/cashFlowsController.js'

router.route("/").post(createCashFlow).get(getAllCashFlow)
router.route('/:id').delete(deleteCashFlow).patch(updateCashFlow)


export default router