const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.setProviderReceiverIds = catchAsync(async (req, res, next) => {
  // Allow nested routes

  const receiverUser = await User.findOne({
    username: req.body.reviewReceiver,
  });
  if (receiverUser) {
    req.body.reviewReceiver = receiverUser._id;
  } else {
    return next(new AppError('Review receiver not found', 404));
  }

  if (!req.body.reviewProvider) req.body.reviewProvider = req.user._id;
  next();
});

exports.getReviewsFromUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: 'reviews',
    populate: {
      path: 'reviewProvider',
      select: 'username email', // Select fields you want to display
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: user.reviews,
    },
  });
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review, {
  path: 'reviewReceiver reviewProvider',
});
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
