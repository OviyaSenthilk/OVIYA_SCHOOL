import express from 'express';
import Notice from '../models/Notice.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all notices
router.get('/', auth, async (req, res) => {
  try {
    const { category, type, priority } = req.query;
    const user = await User.findById(req.userId);
    
    let filter = {
      isActive: true,
      targetAudience: { $in: [user.role] }
    };

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (priority) filter.priority = priority;

    const notices = await Notice.find(filter)
      .populate('author', 'name role')
      .sort({ isPinned: -1, createdAt: -1 });

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create notice (admin/teacher only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!['admin', 'teacher'].includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const notice = new Notice({
      ...req.body,
      author: req.userId
    });

    await notice.save();
    await notice.populate('author', 'name role');

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update notice
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    if (notice.author.toString() !== req.userId && user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    Object.assign(notice, req.body);
    await notice.save();
    await notice.populate('author', 'name role');

    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete notice
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    if (notice.author.toString() !== req.userId && user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;