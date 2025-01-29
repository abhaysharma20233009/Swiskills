const Request = require('../models/requestsModel');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const Swap = require('../models/swapsModel');

// Middleware to get receiver based on username in params
exports.getReceiver = catchAsync(async (req, res, next) => {
  const receiver = await User.findOne({ username: req.params.username });

  if (!receiver) {
    return res.status(400).json({
      status: 'error',
      message: 'Request validation failed: receiver not found',
    });
  }

  req.receiver = receiver;
  next();
});

exports.sendRequest = catchAsync(async (req, res, next) => {
  // Ensure req.receiver is populated by getReceiver middleware
  if (!req.receiver) {
    return res.status(400).json({
      status: 'error',
      message:
        'Request validation failed: request should belong to a valid receiver',
    });
  }

  const request = await Request.create({
    sender: req.user._id,
    receiver: req.receiver._id,
    requestedSkills: req.body.requestedSkills,
    message: req.body.message,
    status: req.body.status || 'pending', // Default status
  });

  // Update requests arrays in both sender and receiver
  await User.findByIdAndUpdate(req.user._id, {
    $addToSet: { requestsSent: request._id },
  });

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
  const request = await Request.findByIdAndUpdate(
    req.params.id,
    {
      status: req.params.status,
    },
    { new: true }
  );

  if (request.status === 'accepted') {
    await Swap.create({
      participants: [request.sender, request.receiver],
      requestedSkills: request.requestedSkills,
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      request,
    },
  });
});

exports.getReceivedRequests = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).populate({
    path: 'requestsReceived',
    populate: {
      path: 'sender', // Populate the sender's details
      select: 'name email', // You can adjust which fields of the sender to select
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      receivedRequests: currentUser.requestsReceived,
    },
  });
});

exports.getSentRequests = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).populate({
    path: 'requestsSent',
    populate: {
      path: 'receiver',
      select: 'username email',
    },
  });

  res.status(200).json({
    status: 'success',
    data: {
      sentRequests: currentUser.requestsSent,
    },
  });
});

exports.deleteRequest = factory.deleteOne(Request);
exports.getRequest = factory.getOne(Request, {
  path: 'sender receiver',
});

exports.updateRequest = factory.updateOne(Request);
