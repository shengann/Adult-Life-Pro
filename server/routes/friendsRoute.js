import express from 'express';
const router = express.Router();
import { createFriend, deleteFriend, getAllFriend, updateFriend, getPayable, getReceivable,  getFriendDetail } from '../modules/friends/friendsController.js'

router.route("/").post(createFriend).get(getAllFriend)
router.route("/payable").get(getPayable)
router.route("/receivable").get(getReceivable)
router.route('/:id').delete(deleteFriend).patch(updateFriend)
router.route('/detail/:id').get(getFriendDetail)


export default router