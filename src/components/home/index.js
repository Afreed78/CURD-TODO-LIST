import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

class HomeRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      taskInput: '',
      editIndex: null,
      isCompleted: {},
    }
  }

  handleInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  addTask = () => {
    const {taskInput, editIndex, tasks} = this.state

    if (editIndex !== null) {
      // Update task
      this.setState(prevState => {
        const updatedTasks = prevState.tasks.map((task, index) =>
          index === editIndex ? taskInput : task,
        )
        return {
          tasks: updatedTasks,
          taskInput: '',
          editIndex: null,
        }
      })
    } else {
      // Add new task
      this.setState(prevState => ({
        tasks: [...prevState.tasks, taskInput],
        taskInput: '',
      }))
    }
  }

  editTask = index => {
    this.setState(prevState => ({
      taskInput: prevState.tasks[index],
      editIndex: index,
    }))
  }

  deleteTask = index => {
    this.setState(prevState => {
      const updatedTasks = prevState.tasks.filter((_, i) => i !== index)
      const updatedCompleted = {...prevState.isCompleted}
      delete updatedCompleted[index] // Remove completion state of deleted task
      return {
        tasks: updatedTasks,
        isCompleted: updatedCompleted,
      }
    })
  }

  toggleCompletion = index => {
    this.setState(prevState => ({
      isCompleted: {
        ...prevState.isCompleted,
        [index]: !prevState.isCompleted[index],
      },
    }))
  }

  calculateProgress = () => {
    const {tasks, isCompleted} = this.state
    const completedTasks = tasks.filter((_, index) => isCompleted[index])
    return tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0
  }

  render() {
    const cookieResponse = Cookies.get('jwt_token')
    if (cookieResponse === undefined) {
      return <Redirect to="/login" />
    }

    const {tasks, taskInput, isCompleted, editIndex} = this.state
    const progress = this.calculateProgress()

    return (
      <div>
        <Header />
        <div className="todo-bg-container">
          <h1 className="heading">Advanced Todo List</h1>

          {/* Progress Section */}
          <div className="progress-container">
            <h3>Progress: {progress}% Completed</h3>
          </div>

          <div className="todo-input-container">
            <input
              type="text"
              value={taskInput}
              onChange={this.handleInputChange}
              placeholder="Add a new task"
              className="todo-input"
            />
            <button type="button" onClick={this.addTask} className="add-button">
              {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
          </div>

          <ul className="todo-list">
            {tasks.map((task, index) => (
              <li
                key={`task-${index}`}
                className={`todo-item ${isCompleted[index] ? 'completed' : ''}`}
              >
                <span
                  className="task-text"
                  onClick={() => this.toggleCompletion(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={e =>
                    e.key === 'Enter' && this.toggleCompletion(index)
                  }
                >
                  {task}
                </span>
                <div className="button-group">
                  <button
                    onClick={() => this.toggleCompletion(index)}
                    className="complete-button"
                  >
                    {isCompleted[index] ? 'Undo' : 'Mark as Completed'}
                  </button>
                  <button
                    onClick={() => this.editTask(index)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.deleteTask(index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default HomeRoute
