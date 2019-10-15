const express = require('express');
let todos = require('../controllers/todos');
let todoController = new todos();
let router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route('/v1/todos')
    .get(todoController.getAllTasks)
    .post(todoController.postTask)

router.route('/v1/todos/:id')
    .get(todoController.getTaskById)
    .put(todoController.updateTask)
    .delete(todoController.deleteTask)

module.exports = router;