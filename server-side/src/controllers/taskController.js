const { createTask, getTasks } = require('../models/taskModel')

const createTaskById = async (req, res) => {
    const { user_id, title, description, priority,due_date } = req.body
    try {
        const newTask = await createTask(user_id, title, description,priority, due_date)
        res.json({ task: newTask })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTasksById = async (req,res) => {
    try {
        const user_id = req.query.user_id
         if (!user_id) {
            return res.status(400).json({ error: 'Missing user_id' });
        }

        const tasks = await getTasks(Number(user_id))
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {createTaskById,getTasksById}