import express from 'express';
import Chat from '../models/Chat.js';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all chats for a user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.userId
    })
    .populate('participants', 'name email role avatar isOnline lastSeen')
    .populate('lastMessage.sender', 'name')
    .sort({ 'lastMessage.timestamp': -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get or create chat between two users
router.post('/create', auth, async (req, res) => {
  try {
    const { participantId } = req.body;
    
    let chat = await Chat.findOne({
      participants: { $all: [req.userId, participantId] },
      isGroup: false
    }).populate('participants', 'name email role avatar isOnline lastSeen');

    if (!chat) {
      chat = new Chat({
        participants: [req.userId, participantId]
      });
      await chat.save();
      await chat.populate('participants', 'name email role avatar isOnline lastSeen');
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get messages for a chat
router.get('/:chatId/messages', auth, async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    
    const chat = await Chat.findById(req.params.chatId)
      .populate('messages.sender', 'name avatar')
      .slice('messages', [(page - 1) * limit, limit]);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is participant
    if (!chat.participants.includes(req.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(chat.messages.reverse());
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Send message
router.post('/:chatId/messages', auth, async (req, res) => {
  try {
    const { content, messageType = 'text', fileUrl, fileName } = req.body;
    
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is participant
    if (!chat.participants.includes(req.userId)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const message = {
      sender: req.userId,
      content,
      messageType,
      fileUrl,
      fileName
    };

    chat.messages.push(message);
    chat.lastMessage = {
      content,
      sender: req.userId,
      timestamp: new Date()
    };

    await chat.save();
    await chat.populate('messages.sender', 'name avatar');

    const newMessage = chat.messages[chat.messages.length - 1];
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark messages as read
router.put('/:chatId/read', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Mark unread messages as read
    chat.messages.forEach(message => {
      if (!message.isRead && message.sender.toString() !== req.userId) {
        message.isRead = true;
        message.readBy.push({
          user: req.userId,
          readAt: new Date()
        });
      }
    });

    await chat.save();
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get potential chat contacts
router.get('/contacts', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    let contacts = [];

    if (currentUser.role === 'parent') {
      // Parents can chat with teachers and admin
      contacts = await User.find({
        role: { $in: ['teacher', 'admin'] },
        _id: { $ne: req.userId }
      }).select('name email role avatar isOnline lastSeen');
    } else if (currentUser.role === 'teacher') {
      // Teachers can chat with parents and admin
      contacts = await User.find({
        role: { $in: ['parent', 'admin'] },
        _id: { $ne: req.userId }
      }).select('name email role avatar isOnline lastSeen');
    } else if (currentUser.role === 'admin') {
      // Admin can chat with everyone
      contacts = await User.find({
        _id: { $ne: req.userId }
      }).select('name email role avatar isOnline lastSeen');
    }

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;