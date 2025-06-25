import express from 'express';
import Report from '../models/Report.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get reports
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    let filter = {};

    if (user.role === 'parent') {
      filter.student = req.userId;
    } else if (user.role === 'teacher') {
      filter.teacher = req.userId;
    }
    // Admin can see all reports

    const reports = await Report.find(filter)
      .populate('student', 'name email avatar')
      .populate('teacher', 'name email')
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create report (teacher/admin only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!['admin', 'teacher'].includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const report = new Report({
      ...req.body,
      teacher: req.userId
    });

    await report.save();
    await report.populate('student', 'name email avatar');
    await report.populate('teacher', 'name email');

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get report by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('student', 'name email avatar')
      .populate('teacher', 'name email');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    const user = await User.findById(req.userId);
    
    // Check access permissions
    if (user.role === 'parent' && report.student._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    if (user.role === 'teacher' && report.teacher._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;