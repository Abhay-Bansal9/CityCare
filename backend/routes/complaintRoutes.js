const express = require('express');
const router = express.Router();
const {
  fileComplaint,
  getMyComplaints,
  getComplaintById,
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, fileComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/:id', protect, getComplaintById);

module.exports = router;
