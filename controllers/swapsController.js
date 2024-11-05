const Swap = require('../models/swapsModel');
const catchAsync = require('../utils/catchAsync');

exports.getSwaps = catchAsync(async (req, res, next) => {
  const swaps = await Swap.find({
    participants: { $in: [req.user._id] },
    status: req.params.status,
  });
  res.status(200).json({
    status: 'success',
    data: {
      swaps,
    },
  });
});
