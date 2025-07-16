const { createTask, getTasks, deleteTask, updateTaskStatus } = require('../models/taskModel')

const createTaskById = async (req, res) => {
    const { user_id, title, description, priority, due_date } = req.body
    try {
        const newTask = await createTask(user_id, title, description, priority, due_date)
        res.json({ task: newTask })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTasksById = async (req, res) => {
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

const deleteTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid or missing task id' });
        }

        const deleted = await deleteTask(id);

        if (deleted.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted', task: deleted[0] });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateByStatus = async (req, res) => {
    const { id, priority } = req.body
    try {
        const updateStatus = await updateTaskStatus(priority, id)
        res.json({ status: updateStatus })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { createTaskById, getTasksById, deleteTaskById,updateByStatus }