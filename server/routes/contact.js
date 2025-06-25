import express from 'express';
import Contact from '../models/Contact.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all contacts (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const contacts = await Contact.find()
      .populate('assignedTo', 'name email')
      .populate('respondedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update contact status
router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!['admin', 'teacher'].includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        respondedBy: req.userId,
        respondedAt: new Date()
      },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;