import express from 'express';
const router = express.Router();

router.get('/send', (req, res) => {
  res.json({ message: 'This is a protected message.' });
});
router.get('/receive', (req, res) => {
  res.json({ message: 'This is a received message.' });
});

export default router;