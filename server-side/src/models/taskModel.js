const db = require('../config/db')

const createTask = async (user_id,title,description,priority,due_date) =>{
    const result = await db.query(
        'INSERT INTO task_data (user_id,title,description,due_date,priority) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [user_id,title,description,due_date,priority]
    );
    return result.rows[0]
}

const getTasks = async (user_id) =>{
    const result = await db.query(
        'SELECT * FROM task_data WHERE user_id = $1 ORDER BY due_date ASC',
        [user_id]
    )
    return result.rows
}

const deleteTask = async (id) => {
    const result = await db.query(
        'DELETE FROM task_data WHERE id = $1 RETURNING *',
        [id]
    )
    return result.rows
}
module.exports = {createTask, getTasks,deleteTask}