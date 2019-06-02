import React from "react"
import { faSquare, faCheckSquare, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = { done: false, title: props.title, editMode: false, newVal: props.title }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
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
        this.setState({ newVal: event.target.value })
    }

    handleEdit() {
        this.setState({ editMode: true })
    }

    handleKeyPress(event) {
        //KeyCode 27 is Esc key and 13 Enter
        if (event.keyCode === 27) {
            this.setState({ editMode: false })
        } else if (event.keyCode === 13) {
            this.setState(state => {
                return {
                    editMode: false,
                    //Just edit if newVal has real value without no empty spaces
                    title: (state.newVal.trim().length) ? state.newVal : state.title
                }
            })
        }
    }

    handleBlur() {
        this.setState({ editMode: false })
    }

    render() {
        const squareColor = this.props.color ? this.props.color : { done: '#28a745', default: '#ccc' }
        const icon = this.state.done ? faCheckSquare : faSquare
        const color = this.state.done ? squareColor.done : squareColor.default
        const hasToStrike = this.state.done && this.props.strikeIt
        const { editMode, title } = this.state
        return (
            !editMode
                ? (<div className="todo-item row">
                    <div className="col-md-10">
                        <FontAwesomeIcon icon={icon} color={color}
                            style={{ marginRight: 5 }} onClick={this.handleClick}></FontAwesomeIcon>
                        {hasToStrike
                            ? (<strike onClick={this.handleClick}>{title}</strike>)
                            : (<span onClick={this.handleClick}>{title}</span>)
                        }
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-secondary btn-xs float-right"
                            onClick={this.handleEdit}><FontAwesomeIcon icon={faPen}></FontAwesomeIcon></button>
                    </div>
                </div>)
                : (<div>
                    <input type="text" className="form-control form-control-sm"
                        value={this.state.newVal} onChange={this.handleChange} autoFocus
                        onKeyDown={this.handleKeyPress} onBlur={this.handleBlur}
                        title="Press Esc key to disscard or Enter to accept changes" />
                </div>)
        )
    }
}

export default TodoItem