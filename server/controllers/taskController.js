const supabase = require('../db/database');
const taskController = {};

taskController.getAllTasks = async (req, res, next) => {
    const { data, error } = await supabase
    .from('task')
    .select('id, name');
    console.log('data from task: ', data);
    res.locals.tasks = data;
    if(error) {
        return next({error: 'Something went wrong while retrieving all tasks'});
    }
    return next();
}

taskController.createNewTask = async (req, res, next) => {
    const newTask = req.body.taskName;
    const { data, error } = await supabase
    .from('task')
    .insert([
    { name: newTask},
    ])
    .select();
    const addedTask = data[0];
    res.locals.addedTask = addedTask;
    if(error) {
        return next({error: 'Something went wrong while creating a new task'});
    }
    return next();
}

taskController.updateTask = async (req, res, next) => {
    const parentId = req.params.id;
    const updatedTaskName = req.body.updatedTaskName;
    const { data, error } = await supabase
    .from('task')
    .update({ name: updatedTaskName })
    .eq('id', parentId)
    .select()
    res.locals.updatedTask = data[0];
    if(error) {
        return next({error: 'Something went wrong while updating a task'});
    }
    return next();
}

taskController.deleteTask = async (req, res, next) => {
    const parentId = req.params.id;
    const { error } = await supabase
    .from('task')
    .delete()
    .eq('id', parentId);
    if(error) {
        return next({error: 'Something went wrong while deleting a task'});
    }
    return next();
}

module.exports = taskController;