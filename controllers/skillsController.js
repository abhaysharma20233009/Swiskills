const fs = require('fs');
const Skill = require('../models/skillsModel');
const factory = require('./handlerFactory');

exports.getAllSkills = factory.getAll(Skill);
