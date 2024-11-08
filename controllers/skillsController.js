const fs = require('fs');
const Skill = require('../models/skillsModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getSkillByName = async (req, res, next) => {
  console.log('this is the req' + req);
  const { name } = req.body;
  const skill = await Skill.findOne({ name: name });

  if (!skill) {
    return res.status(404).json({
      status: 'fail',
      message: 'Skill not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      skill,
    },
  });
};

exports.getSkill = factory.getOne(Skill, { path: 'user' });
exports.getAllSkills = factory.getAll(Skill);
