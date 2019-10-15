let db = require('../db/dummy_db.js');
let models = require('../sequelize/models');

class TodosController {
    getAllTasks(req, res) {
        res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos: db
        });
    };
    
    getTaskById(req, res) {
        let id = parseInt(req.params.id, 10);
        let task = db.find((todo) => {
            return todo.id === id;
        });
    
        if (task) {
            return res.status(200).send({
                success: 'true',
                message: 'This is the task you are looking for.',
                content: task
            });
        }
    
        return res.status(404).send({
            success: 'failure',
            message: 'These are not the tasks you\'re looking for...'
        });
    }
    
    postTask(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: '[Title] is a required field!'
            });
        }
    
        let todo = {
            title: req.body.title
        }
    
        models.Todo.create(todo).then((todo) => {
            return res.status(201).send({
                success: 'true',
                message: 'todo added successfully',
                todo
            })
        });
    }
    
    updateTask(req, res) {
        const id = parseInt(req.params.id, 10);
        let taskIndex;
    
        if (!req.body.title) {
            return res.status(404).send({
                success: 'false',
                message: '"Title" is a required field.'
            });
        } else if (!req.body.description) {
            return res.status(404).send({
                success: 'false',
                message: '"Description" is a required field.'
            });
        }
    
        let task = db.find((todo, index) => {
            if (todo.id === id) {
                taskIndex = index;
                return todo;
            }
        });
    
        if (!task) {
            return res.status(404).send({
                success: 'false',
                message: 'Task not found.'
            });
        } else {
            task = {
                id: task.id,
                title: req.body.title || task.title,
                description: req.body.description || task.description
            };
            db.splice(taskIndex, 1, task);
            return res.status(201).send({
                success: 'true',
                message: 'Task successfully updated.',
                content: task
            });
        }
    }
    
    deleteTask(req, res) {
        let id = parseInt(req.params.id, 10);
        for (let i = 0; i < db.length; i++) {
            if (db[i].id === id) {
                db.splice(i, 1);
                return res.status(200).send({
                    success: 'true',
                    message: `Task id:${id} successfully deleted.`
                });
            }
        }
    
        return res.status(404).send({
            success: 'false',
            message: 'Task not found.'
        });
    }
}

module.exports = TodosController;