const express = require('express')
const router = express.Router();
const taskController = require('../controllers/taskController')

router.post('/create-task',taskController.createTaskById)
router.get('/all',taskController.getTasksById)
router.delete('/delete/:id',taskController.deleteTaskById)
router.patch('/update', taskController.updateByStatus)


module.exports = router