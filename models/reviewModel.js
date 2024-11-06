const mongoose = require('mongoose');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
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
    skillName: {
      type: String,
      required: [true, 'Review must belong to a skill'],
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

//here this point to Model
reviewSchema.statics.calcAverageRatings = async function (
  reviewReceiverId,
  skillName,
  reviewId
) {
  const stats = await this.aggregate([
    {
      $match: { reviewReceiver: reviewReceiverId, skillName: skillName },
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
    await User.findByIdAndUpdate(
      reviewReceiverId,
      {
        $set: {
          'skills.$[elem].ratingQuantity': stats[0].nRating,
          'skills.$[elem].rating': stats[0].avgRating,
          'skills.$[elem].reviews': reviewId,
        },
      },
      {
        arrayFilters: [
          { 'elem.skillName': skillName }, // Match the skillName you want to update
        ],
      }
    );
  }
};

// this.constructer point to current MODEL
reviewSchema.post('save', function () {
  //this points to current review
  this.constructor.calcAverageRatings(
    this.reviewReceiver,
    this.skillName,
    this._id
  );
});

//findByIdAndUpdate
//findByIdAndDelete

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery()); // to access the review model in query middle ware
  // console.log(this.r);
  //save in current query so that i can access in post
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // this.r = await this.findOne(); does NOT work here,query has already executed
  await this.r.constructor.calcAverageRatings(
    this.r.reviewReceiver,
    this.r.skillName
  );
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
