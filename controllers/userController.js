const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const Skill = require('../models/skillsModel');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  console.log("hi",req.body);
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use updateMyPassword.',
        400
      )
    );
  }

  // 2) Filter out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'email', 'bio', 'skills', 'profilePicture', 'profile');
console.log(filteredBody);
  // 3) Update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 4) Update the Skill model with the new skills, if skills are provided in the request
  if (req.body.skills && Array.isArray(req.body.skills)) {
    await Promise.all(
      req.body.skills.map(async (skill) => {
        await Skill.findOneAndUpdate(
          { name: skill.skillName },
          { $addToSet: { users: updatedUser._id } },
          { new: true, upsert: true } // Upsert to create if not exists
        );
      })
    );
  }

  res.status(200).json({
    status: 'success',
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});


exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUser = factory.getOne(User, {
  path: 'requestsReceived requestsSent',
});
// Do NOT update passwords with this!

exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
