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
        const checkClass = this.state.done ? 'text-success' : ''
        return (
            <span onClick={this.handleClick}>
                <FontAwesomeIcon icon={icon} className={checkClass}></FontAwesomeIcon>
                {this.props.title}
            </span>
        )
    }
}

export default TodoItem