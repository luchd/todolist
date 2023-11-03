const supabase = require('../db/database');
const taskController = {};

taskController.getAllTasks = async (req, res, next) => {
    const { data, error } = await supabase
    .from('task')
    .select('id');
    console.log('data from task: ', data);
    res.locals.tasks = data;
    return next();
}

module.exports = taskController;