const express = require('express');
const router = express.Router();
const {
  getAllComplaints,
  updateComplaintStatus,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/complaints', protect, adminOnly, getAllComplaints);
router.put('/complaints/:id', protect, adminOnly, updateComplaintStatus);
router.get('/stats', protect, adminOnly, getDashboardStats);

module.exports = router;
