const _ = require('lodash')

let _todos = []

const addTodo = todo => {
    if (!_todos.includes(todo)) {
        _todos.push(todo)
    }

}

const getTodoList = () => {
    return _todos
}

const removeTodo = todo => {
    _.pull(_todos, todo)
}

const resetTodoList = () => {
    _todos = []
}

module.exports.TodoList = { addTodo, getTodoList, resetTodoList, removeTodo }
