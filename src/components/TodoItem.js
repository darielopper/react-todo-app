import React from 'react'
import { faSquare, faCheckSquare, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { done: false, title: props.title }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleClick() {
        this.setState((state) => {
            return {
                done: !state.done
            }
        })
        if (this.props.onChanged) {
            this.props.onChanged(!this.state.done)
        }
    }

    handleChange(event) {
        this.setState({ title: event.target.value })
    }

    render() {
        const squareColor = this.props.color ? this.props.color : { done: '#28a745', default: '#ccc' }
        const icon = this.state.done ? faCheckSquare : faSquare
        const color = this.state.done ? squareColor.done : squareColor.default
        const hasToStrike = this.state.done && this.props.strikeIt
        return (
            <div className="todo-item">
                <FontAwesomeIcon icon={icon} color={color}
                    style={{ marginRight: 5 }} onClick={this.handleClick}></FontAwesomeIcon>
                {hasToStrike
                    ? (<strike onClick={this.handleClick}>{this.props.title}</strike>)
                    : (<span onClick={this.handleClick}>{this.props.title}</span>)
                }
                <button className="btn btn-secondary btn-sm float-right"><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></button>
            </div>
            /*<div>
                <input type="text" className="form-control form-control-sm"
                    value={this.state.title} onChange={this.handleChange} />
            </div>*/
        )
    }
}

export default TodoItem