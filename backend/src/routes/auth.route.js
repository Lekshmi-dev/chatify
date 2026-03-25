import express from 'express';
import { signup,login,logout,updateProfile} from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';
import  upload  from "../middleware/uploadFile.middleware.js";
import { arcjetProtection } from '../middleware/arcject.middleware.js';

const router = express.Router();
router.use(arcjetProtection);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout',logout); 
//check authenticated or not->use middleware function 
router.put('/update-profile',protectedRoute,upload.single("profilePicture"),updateProfile); 

export default router;