const express = require('express');

const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getAllTasks, async (req, res) => {

    res.status(200).send({mess: 'Hello'});
});

router.post('/', taskController.getAllTasks, (req, res) => {
    console.log('Hello from POST /api');
    res.status(200).json(res.locals.tasks);
});

module.exports = router;