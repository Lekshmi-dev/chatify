import express, { Router } from 'express';
import {getAllContacts,getMessagesByUserId,sendMessage,getAllChatPartners} from "../controllers/message.controller.js";
import { protectedRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcject.middleware.js';
import  uploadChatImage  from "../middleware/uploadImagemiddleware.js";

const router = express.Router();
router.use(protectedRoute,arcjetProtection);
router.get('/contacts',getAllContacts);
router.get('/chats',getAllChatPartners);
router.get('/:id',getMessagesByUserId);
router.post('/send/:id',uploadChatImage.single("image"),sendMessage);

router.get('/receive', (req, res) => {
  res.json({ message: 'This is a received message.' });
});

export default router;