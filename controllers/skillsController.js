const fs = require("fs");
const Skill = require("../models/skillsModel");
const factory = require("./handlerFactory");

exports.getSkill = factory.getOne(Skill, { path: "users" });
exports.getAllSkills = factory.getAll(Skill);
