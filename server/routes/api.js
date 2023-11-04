const express = require('express');

const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getAllTasks, async (req, res) => {
    console.log('Hello from GET /api');
    res.status(200).json(res.locals.tasks);
});

router.post('/', taskController.createNewTask, (req, res) => {
    console.log('Hello from POST /api');
    // console.log('res.locals.addedTask: ', res.locals.addedTask);
    if(res.locals.addedTask) {
        console.log('Successfully added a new task');
        res.status(200).json(res.locals.addedTask);
    }
    else {
        res.status(200).json({error: 'Something went wrong'});
    }
});

router.patch('/:id', taskController.updateTask, (req, res) => {
    if(res.locals.updatedTask) {
        res.status(200).json(res.locals.updatedTask);
    }
    else {
        res.status(200).json({err: 'Something went wrong'});
    }
});

router.delete('/:id', taskController.deleteTask, (req, res) => {
    res.status(200).json({mess: 'Successfully deleted task'});
});

module.exports = router;