const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');

exports.setProviderReceiverIds = (req, res, next) => {
  //Allow nested routes
  if (!req.body.reviewReceiver)
    req.body.reviewReceiver = req.params.reviewReceiverId;
  if (!req.body.user) req.body.reviewProvider = req.user._id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review, {
  path: 'reviewReceiver reviewProvider',
});
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
