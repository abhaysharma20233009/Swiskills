const fs = require('fs');
const express = require('express');
const skillsController = require('../controllers/skillsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(skillsController.getAllSkills)
  .post(skillsController.getSkillByName);

router.route('/:id').get(skillsController.getSkill);

module.exports = router;
