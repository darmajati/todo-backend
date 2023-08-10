const router = require('express').Router()
const todoController = require ('../controller/todoController')

router.get('/api/get', todoController.getAllTodos)
router.post('/api/create', todoController.createTodo)
router.patch('/api/update/:id', todoController.updateTodo)
router.delete('/api/delete/:id', todoController.deleteTodo)


module.exports = router