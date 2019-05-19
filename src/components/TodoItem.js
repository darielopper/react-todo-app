import React from 'react'
import { faSquare, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { done: false }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState((state) => {
            return {
                done: !state.done
            }
        })
    }

    render() {
        const icon = this.state.done ? faCheckSquare : faSquare
        const color = this.state.done ? '#28a745' : '#ccc'
        return (
            <span onClick={this.handleClick} className="todo-item">
                <FontAwesomeIcon icon={icon} color={color} style={{ marginRight: 5 }}></FontAwesomeIcon>
                {this.props.title}
            </span>
        )
    }
}

export default TodoItem