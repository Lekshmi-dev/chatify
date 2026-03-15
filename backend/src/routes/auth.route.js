import express from 'express';
const router = express.Router();

router.get('/signup', (req, res) => {
  res.send('Signup successful!');
});

router.get('/login', (req, res) => {
  res.send('Login successful!');
});

router.get('/logout', (req, res) => {
  res.send('Logout successful!');
});     

export default router;