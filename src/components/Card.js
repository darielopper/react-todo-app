import React from "react"
import propTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import TodoItem from "./TodoItem"
const classnames = require('classnames')

class Card extends React.Component {
    static defaultProps = {
        onRemove: () => {}
    }

    static propTypes = {
        onRemove: propTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            cardCss: ['card', 'bg-default', 'animated', 'bounceIn', 'mt-5'],
            tasks: props.tasks
        }

        this.addTask = this.addTask.bind(this)
        this.removeCard = this.removeCard.bind(this)
        this.removeTask = this.removeTask.bind(this)
    }

    addTask() {
        this.setState(state => {
            let newTasks = [...state.tasks]
            newTasks.push({ title: 'New Task', strikeIt: true, editMode: true })

            return { tasks: newTasks }
        })
    }

    removeCard() {
        this.setState(state => {
            const classAsText = state.cardCss.join(' ')
            const replaceClass = classAsText.replace('bounceIn', 'bounceOut')

            return { cardCss: replaceClass.split(' ') }
        })

        this.props.onRemove()
    }

    removeTask(index) {
        if (confirm('Are you sure you want delete this item?')) {
            this.setState(state => {
                let newTasks = state.tasks
                newTasks.splice(index, 1)

                return {tasks: newTasks}
            })
        }
    }

    hasAnyTask() {
        return this.state.tasks && !!this.state.tasks.length
    }

    render() {
        const defaultColor = { done: '#1E1E1E', default: '#CCC' }
        const timeEllapsed = "Recently"
        const { cardCss, tasks } = this.state
        return (
            <div className={classnames(cardCss)} style={{ width: 300 }}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.category}</h5>
                    <div className="card-text">
                        {this.hasAnyTask() && (
                            tasks.map((item, index) =>
                                <TodoItem title={item.title}
                                    strikeIt={item.strikeIt}
                                    editMode={!!item.editMode}
                                    color={defaultColor}
                                    key={item + '_' + index}
                                    onRemove={() => this.removeTask(index)}
                                    onChanged={(val) => console.log(val)} />
                            )
                        )}
                    </div>
                    <h6 className="card-subtitle text-muted float-right mt-4">

                    </h6>
                </div>
                <div className="card-footer">
                    <a href="javascript: void(0);" className={classnames('btn', 'btn-sm', 'btn-success')}
                        onClick={this.addTask}>Add Task</a>
                    <a href="javascript: void(0);" className="btn btn-sm btn-danger float-right"
                        onClick={this.removeCard}>Remove</a>
                </div>
            </div>
        )
    }
}

export default Card