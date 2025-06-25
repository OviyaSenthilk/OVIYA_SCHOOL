import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportType: {
    type: String,
    enum: ['progress', 'assessment', 'behavior', 'attendance'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  subjects: [{
    name: String,
    score: Number,
    grade: String,
    comments: String
  }],
  overallScore: Number,
  overallGrade: String,
  attendance: {
    present: Number,
    absent: Number,
    percentage: Number
  },
  achievements: [{
    title: String,
    description: String,
    date: Date,
    icon: String
  }],
  milestones: [{
    title: String,
    achieved: Boolean,
    date: Date
  }],
  fileUrl: String,
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Report', reportSchema);