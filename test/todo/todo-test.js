const { assert } = require('chai');  // Using Assert style
const { expect } = require('chai');  // Using Expect style
const { should } = require('chai');  // Using Should style

const objectUnderTest = require('../../src/todo').TodoList

/**
 * descrive defines a test suite that can have multiple tests inside it.
 * Also describe can be nested to create a sub suite.  
 * 
 * "it" is a single test unit that is used to test a scenario.
 */
describe(`TodoList needs to be empty initially.`, () => {
    it('#getTodoList must return empty todo list', (done) => {
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.empty
        done()
    })

    it('#getTodoList must return null or undefined', (done) => {
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).not.to.be.null
        expect(todolist).not.to.be.undefined
        done()
    })
})


describe(`TodoList must add todo item in list consistently.`, () => {
    it('#addTodo must add only 1 item to list at a time.', (done) => {
        objectUnderTest.addTodo('Todo-1')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(1)
        done()
    })

    it('#addTodo must add item with correct value.', (done) => {
        objectUnderTest.addTodo('Todo-2')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(1)
        expect(todolist).to.include('Todo-2')
        done()
    })

    it('#addTodo must not add duplicate item to list.', (done) => {
        objectUnderTest.addTodo('Todo-2')
        objectUnderTest.addTodo('Todo-2')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(1)
        expect(todolist).to.include('Todo-2')
        done()
    })

    it('#addTodo must retain all previously added items.', (done) => {
        objectUnderTest.addTodo('Todo-1')
        objectUnderTest.addTodo('Todo-2')
        objectUnderTest.addTodo('Todo-3')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(3)
        expect(todolist).to.include('Todo-1')
        expect(todolist).to.include('Todo-2')
        expect(todolist).to.include('Todo-3')
        done()
    })

})

describe(`TodoList must remove items consistently`, () => {
    it(`#removeTodo must remove item from the list`, done => {
        objectUnderTest.addTodo('Todo-1')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(1)
        objectUnderTest.removeTodo('Todo-1')
        expect(todolist).to.be.an('array').of.length(0)
        done()
    })

    it(`#removeTodo must remove only specific item from the list`, done => {
        objectUnderTest.addTodo('Todo-1')
        objectUnderTest.addTodo('Todo-2')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(2)
        objectUnderTest.removeTodo('Todo-2')
        expect(todolist).to.be.an('array').of.length(1)
        expect(todolist).to.include('Todo-1')
        expect(todolist).not.to.include('Todo-2')
        done()
    })
    it(`#removeTodo must remove only specific item from the list and can add it back again.`, done => {
        objectUnderTest.addTodo('Todo-1')
        objectUnderTest.addTodo('Todo-2')
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.an('array').of.length(2)
        objectUnderTest.removeTodo('Todo-2')
        expect(todolist).to.be.an('array').of.length(1)
        expect(todolist).to.include('Todo-1')
        expect(todolist).not.to.include('Todo-2')
        objectUnderTest.addTodo('Todo-2')
        expect(todolist).to.be.an('array').of.length(2)
        expect(todolist).to.include('Todo-2')
        done()
    })
})

describe(`TodoList needs to be empty after reset.`, () => {
    it('#resetTodoList must set list to empty', (done) => {
        objectUnderTest.resetTodoList()
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).to.be.empty
        done()
    })

    it('#resetTodoList must set list to null or undefined', (done) => {
        objectUnderTest.resetTodoList()
        const todolist = objectUnderTest.getTodoList()
        expect(todolist).not.to.be.null
        expect(todolist).not.to.be.undefined
        done()
    })
})

afterEach(() => {
    objectUnderTest.resetTodoList()
})
