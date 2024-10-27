const fs = require('fs');
const Skill = require('../models/skillsModel');

exports.getAllSkills = async (req, res, next) => {
  const skills = await Skill.find();
  res.status(200).json({
    status: 'success',
    data: skills,
  });
};
