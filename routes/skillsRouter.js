const fs = require('fs');
const express = require('express');
const skillsController = require('../controllers/skillsController');

const router = express.Router();

router.route('/').get(skillsController.getAllSkills);

module.exports = router;
