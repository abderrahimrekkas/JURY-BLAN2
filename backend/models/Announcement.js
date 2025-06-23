

const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Driver id is required"]
  },
  startPoint: {
    type: String,
    required: [true, "Start point is required"],
    trim: true
  },
  waypoints: [{
    type: String,
    trim: true
  }],
  destination: {
    type: String,
    required: [true, "Destination is required"],
    trim: true
  },
  maxDimensions: {
    length: { type: Number, min: 0, default: 0 },
    width: { type: Number, min: 0, default: 0 },
    height: { type: Number, min: 0, default: 0 }
  },
  packageTypes: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  availableCapacity: {
    type: Number,
    required: [true, "Available capacity is required"],
    min: [0, "Capacity cannot be negative"]
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: {
      validator: function(value) {
        // Allow dates that are today or in the future
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        const inputDate = new Date(value);
        inputDate.setHours(0, 0, 0, 0); // Reset time to start of day
        return inputDate >= today;
      },
      message: "Start date must be today or in the future"
    }
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > this.startDate;
      },
      message: "End date must be after start date"
    }
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'active', 'completed', 'cancelled'],
      message: "Status must be pending, active, completed or cancelled"
    },
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AnnouncementModel = mongoose.model('Announcement', AnnouncementSchema);
module.exports = AnnouncementModel;
