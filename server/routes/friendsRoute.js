import express from 'express';
const router = express.Router();
import { createFriend, deleteFriend, getAllFriend, updateFriend, getPayable, getReceivable } from '../modules/friends/friendsController.js'

router.route("/").post(createFriend).get(getAllFriend)
router.route('/:id').delete(deleteFriend).patch(updateFriend)
router.route("/payable").get(getPayable)
router.route("/receivable").get(getReceivable)


export default router