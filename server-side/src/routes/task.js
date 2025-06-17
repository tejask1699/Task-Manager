const express = require('express')
const router = express.Router();
const taskController = require('../controllers/taskController')

router.post('/create-task',taskController.createTaskById)
router.get('/all',taskController.getTasksById)

module.exports = router