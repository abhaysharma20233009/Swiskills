const mongoose = require('mongoose');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reviewReceiver: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    reviewProvider: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    skills: {
      type: [String],
      required: [true, 'Review must belong to at least one skill'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'reviewReceiver',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (
  reviewReceiverId,
  skillNames,
  reviewId
) {
  try {
    for (const skillName of skillNames) {
      const stats = await this.aggregate([
        {
          $match: {
            reviewReceiver: reviewReceiverId,
            skills: skillName, // Matches the specific skill name in the array
          },
        },
        {
          $group: {
            _id: '$reviewReceiver',
            nRating: { $sum: 1 },
            avgRating: { $avg: '$rating' },
          },
        },
      ]);

      if (stats.length > 0) {
        const roundedAvgRating = Math.round(stats[0].avgRating * 100) / 100;
        const result = await User.findByIdAndUpdate(
          reviewReceiverId,
          {
            $set: {
              'skills.$[elem].ratingQuantity': stats[0].nRating,
              'skills.$[elem].rating': roundedAvgRating,
            },
            $addToSet: {
              'skills.$[elem].reviews': reviewId, // Adds the reviewId to the reviews array
            },
          },
          {
            arrayFilters: [{ 'elem.skillName': skillName }], // Filters based on the exact skill name
            new: true, // Returns the updated document
          }
        );
      }
    }
  } catch (error) {
    console.error('Error in calcAverageRatings:', error);
  }
};

// Calls calcAverageRatings after saving a review
reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(
    this.reviewReceiver,
    this.skills, // Passes all skills in the array
    this._id
  );
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery());
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRatings(
    this.r.reviewReceiver,
    this.r.skills, // Passes all skills in the array
    this.r._id
  );
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
