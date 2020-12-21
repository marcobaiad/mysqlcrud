const express = require('express');
// const { check } = require('express-validator');
const router = express.Router();
const homeworksControllers = require('../controllers/homeWorksControllers');

router.get('/homeworks', homeworksControllers.allHomeworks);

router.post('/add-homework', homeworksControllers.addHomework);

router.put('/edit-homework/:id', homeworksControllers.editHomework);

router.delete('/delete-homework/:id', homeworksControllers.deleteHomework);

module.exports = router;