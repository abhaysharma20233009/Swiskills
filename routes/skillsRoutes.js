const fs = require('fs');
const express = require('express');
const skillsController = require('../controllers/skillsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/:id').get(skillsController.getSkill);
router.route('/').get(authController.protect, skillsController.getAllSkills);

module.exports = router;
