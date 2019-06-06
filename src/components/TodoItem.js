import React from "react"
import propTypes from "prop-types"
import { faSquare, faCheckSquare, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class TodoItem extends React.Component {
    static defaultProps = {
        color: { done: '#28a745', default: '#ccc' },
        title: 'New Task',
        editMode: false,
        strikeIt: true
    }

    static propTypes = {
        color: propTypes.object,
        title: propTypes.string,
        editMode: propTypes.bool,
        strikeIt: propTypes.bool,
        onChanged: propTypes.func
    }

    constructor(props) {
        super(props)
        this.state = { done: false, title: props.title, editMode: !!props.editMode, newVal: props.title }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    //Watch properties
    componentDidUpdate() {
        if(!this.state.editMode) {
            if(!this.state.newVal.trim().length) {
                this.state.newVal = this.props.title
            }
        }
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
                if(!state.newVal.trim().length && typeof this.props.onRemove)
                {
                    this.props.onRemove()
                }
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
        const squareColor = this.props.color
        const icon = this.state.done ? faCheckSquare : faSquare
        const color = this.state.done ? squareColor.done : squareColor.default
        const hasToStrike = this.state.done && this.props.strikeIt
        const { editMode, title, newVal } = this.state
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
                        value={newVal} onChange={this.handleChange} autoFocus
                        onKeyDown={this.handleKeyPress} onBlur={this.handleBlur}
                        title="Press Esc key to disscard or Enter to accept changes" />
                </div>)
        )
    }
}

export default TodoItem