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
        const squareColor = this.props.color ? this.props.color : { done: '#28a745', default: '#ccc' }
        const icon = this.state.done ? faCheckSquare : faSquare
        const color = this.state.done ? squareColor.done : squareColor.default
        const hasToStrike = this.state.done && this.props.strikeIt
        return (
            <div onClick={this.handleClick} className="todo-item">
                <FontAwesomeIcon icon={icon} color={color} style={{ marginRight: 5 }}></FontAwesomeIcon>
                {hasToStrike ? (<strike>{this.props.title}</strike>) : (<span>{this.props.title}</span>)}
            </div>
        )
    }
}

export default TodoItem