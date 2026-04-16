const asyncHandler = require('express-async-handler');
const Complaint = require('../models/Complaint');

// @desc    File a new complaint
// @route   POST /api/complaints
// @access  Private (citizen)
const fileComplaint = asyncHandler(async (req, res) => {
  const { title, description, category, location, image } = req.body;

  // Validate input
  if (!title || !description || !category || !location) {
    res.status(400);
    throw new Error('Please provide title, description, category, and location');
  }

  const complaint = await Complaint.create({
    title,
    description,
    category,
    location,
    image: image || '',
    citizen: req.user._id,
  });

  res.status(201).json(complaint);
});

// @desc    Get complaints filed by logged-in citizen
// @route   GET /api/complaints/my
// @access  Private (citizen)
const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ citizen: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(complaints);
});

// @desc    Get single complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate(
    'citizen',
    'name email'
  );

  if (!complaint) {
    res.status(404);
    throw new Error('Complaint not found');
  }

  // Citizens can only view their own complaints; admins can view all
  if (
    req.user.role !== 'admin' &&
    complaint.citizen._id.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error('Not authorized to view this complaint');
  }

  res.json(complaint);
});

module.exports = { fileComplaint, getMyComplaints, getComplaintById };
