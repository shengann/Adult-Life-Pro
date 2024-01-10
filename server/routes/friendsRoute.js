import express from 'express';
const router = express.Router();
import { createFriend, deleteFriend, getAllFriend, updateFriend } from '../modules/friends/friendsController.js'

router.route("/").post(createFriend).get(getAllFriend)
router.route('/:id').delete(deleteFriend).patch(updateFriend)


export default router