import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCode, faHome, faEdit, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TodoItem from "./TodoItem"
import { initClassHandler } from "../utils"

library.add(faCode, faHome)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addTaskClassName: "btn btn-sm btn-success",
            cardCss: "card bg-default animated bounceIn mt-5"
        }

        this.addTask = this.addTask.bind(this)
        this.removeCard = this.removeCard.bind(this)
    }

    componentWillMount() {
        initClassHandler()
    }

    addTask() {
        this.setState(state => {
            return { addTaskClassName: state.addTaskClassName.split(' ').replaceClass("btn-success", "btn-warning").toClass() }
        })
    }

    removeCard() {
        this.setState(state => {
            return {
                cardCss: state.cardCss.split(' ').replaceClass('bounceIn', 'bounceOut').toClass()
            }
        })
    }

    render() {
        const { cardCss, addTaskClassName } = this.state
        return (
            <div className="container">
                <h1>Hello World, from React App!!</h1>
                <button className="btn btn-info"><FontAwesomeIcon icon="home" /> Okey</button>
                <br />
                <TodoItem title="Probando un todoItem" strikeIt={true} color={{ done: '#ed1c24', default: '#ccc' }} />

                <div className={cardCss} style={{ width: 300 }}>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <h6 className="card-subtitle text-muted float-right">
                            <FontAwesomeIcon icon={faClock} /> 2 min ago
                        </h6>
                    </div>
                    <div className="card-footer">
                        <a href="#" className={addTaskClassName} onClick={this.addTask}>Add Task</a>
                        <a href="#" className="btn btn-sm btn-danger float-right" onClick={this.removeCard}>Remove</a>
                    </div>
                </div>
                <pre>{this.state.addTaskClassName}</pre>
            </div>
        )
    }
}

export default App