const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Skill = require('./skillsModel');
const catchAsync = require('../utils/catchAsync');
//name,email,photo,password,passwordConfrim

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  profilePicture: {
    type: String,
  },
  skills: [{ type: String }],
  bio: {
    type: String,
    maxlength: 500,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  ratingQunatity: {
    type: Number,
    default: 0,
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification',
    },
  ],
  chatMessages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessage',
    },
  ],
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //  This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not same',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  //Only run this function if password was actually modify
  if (!this.isModified('password')) return next();
  //hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
//Apply to every query which start from find
userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// Middleware to update Skill model when a skill is added to a user
userSchema.post(
  'save',
  catchAsync(async function (doc) {
    console.log('User saved:', doc);
    if (doc?.skills?.length) {
      console.log('Updating skills for:', doc.skills);
      await Promise.all(
        doc.skills.map(async (skill) => {
          console.log('Finding skill:', skill);
          const skillDoc = await Skill.findOne({ name: skill });
          if (skillDoc) {
            console.log('Skill found:', skillDoc);
            skillDoc.users.addToSet(doc._id);
            await skillDoc.save();
            console.log('Updated skill:', skillDoc);
          } else {
            console.log('Skill not found:', skill);
          }
        })
      );
    } else {
      console.log('No skills to update for user:', doc._id);
    }
  })
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // this.password is not available due to select
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
