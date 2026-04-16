const asyncHandler = require('express-async-handler');
const Complaint = require('../models/Complaint');

// @desc    Get all complaints (with optional filters)
// @route   GET /api/admin/complaints
// @access  Private (admin)
const getAllComplaints = asyncHandler(async (req, res) => {
  const { status, category } = req.query;

  let filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }

  if (category && category !== 'all') {
    filter.category = category;
  }

  const complaints = await Complaint.find(filter)
    .populate('citizen', 'name email')
    .sort({ createdAt: -1 });

  res.json(complaints);
});

// @desc    Update complaint status, assignedTo, and resolutionRemark
// @route   PUT /api/admin/complaints/:id
// @access  Private (admin)
const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status, assignedTo, resolutionRemark } = req.body;

  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  if (status) complaint.status = status;
  if (assignedTo !== undefined) complaint.assignedTo = assignedTo;
  if (resolutionRemark !== undefined) complaint.resolutionRemark = resolutionRemark;

  const updatedComplaint = await complaint.save();

  res.json(updatedComplaint);
});

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (admin)
const getDashboardStats = asyncHandler(async (req, res) => {
  const total = await Complaint.countDocuments();
  const registered = await Complaint.countDocuments({ status: 'Registered' });
  const inProgress = await Complaint.countDocuments({ status: 'In Progress' });
  const resolved = await Complaint.countDocuments({ status: 'Resolved' });

  res.json({
    total,
    registered,
    inProgress,
    resolved,
  });
});

module.exports = { getAllComplaints, updateComplaintStatus, getDashboardStats };
