import express from 'express';
import Gallery from '../models/Gallery.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = { isPublic: true };

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const galleryItems = await Gallery.find(filter)
      .populate('uploadedBy', 'name role')
      .sort({ createdAt: -1 });

    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload gallery item (teacher/admin only)
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!['admin', 'teacher'].includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const galleryItem = new Gallery({
      ...req.body,
      uploadedBy: req.userId
    });

    await galleryItem.save();
    await galleryItem.populate('uploadedBy', 'name role');

    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Like/unlike gallery item
router.post('/:id/like', auth, async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const existingLike = galleryItem.likes.find(
      like => like.user.toString() === req.userId
    );

    if (existingLike) {
      galleryItem.likes = galleryItem.likes.filter(
        like => like.user.toString() !== req.userId
      );
    } else {
      galleryItem.likes.push({ user: req.userId });
    }

    await galleryItem.save();
    res.json({ likes: galleryItem.likes.length, liked: !existingLike });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;