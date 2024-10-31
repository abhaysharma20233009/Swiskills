const Request = require('../models/requestsModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const factory = require('./handlerFactory');

exports.getReceiver = catchAsync(async (req, res, next) => {
  const receiver = await User.findById(req.params.id);
  req.receiver = receiver;
  next();
});

exports.sendRequest = catchAsync(async (req, res, next) => {
  const request = await Request.create({
    sender: req.user._id,
    receiver: req.receiver._id,
    requestedSkills: req.body.requestedSkills,
    message: req.body.message,
    status: req.body.status,
  });

  // add request in recevier requestsReceived field
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { requestsSent: request._id },
  });

  //add requesr in sender requestsSent field
  await User.findByIdAndUpdate(req.receiver._id, {
    $addToSet: { requestsReceived: request._id },
  });

  res.status(200).json({
    status: 'success',
    data: {
      request,
    },
  });
});

exports.updateRequestStatus = catchAsync(async (req, res, next) => {
  const request = await Request.findByIdAndUpdate(req.params.id, {
    status: req.params.status,
  });
  res.status(200).json({
    status: 'success',
    data: {
      request,
    },
  });
});

exports.deleteRequest = factory.deleteOne(Request);
exports.getRequest = factory.getOne(Request, {
  path: 'sender receiver',
});

exports.updateRequest = factory.updateOne(Request);
