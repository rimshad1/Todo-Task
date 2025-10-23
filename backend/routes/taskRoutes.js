const express = require('express');
const { addTask, getTasks, markDone } = require('../controllers/taskController');
const taskRouter = express.Router();

taskRouter.post('/addTask', addTask);
taskRouter.get('/data', getTasks);
taskRouter.put('/:id/done', markDone);

module.exports = taskRouter;