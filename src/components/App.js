import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCode, faHome, faEdit, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TodoItem from "./TodoItem"
import Modal from "./Modal"
import { initClassHandler, timeAgoValue } from "../utils"

library.add(faCode, faHome)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addTaskClassName: "btn btn-sm btn-success",
            cardCss: "card bg-default animated bounceIn mt-5",
            diff: 0
        }

        this.addTask = this.addTask.bind(this)
        this.removeCard = this.removeCard.bind(this)
        this.startEllapsed = this.startEllapsed.bind(this)
    }

    componentWillMount() {
        this.initTime = new Date()
        this.startEllapsed()
    }

    componentWillMount() {
        initClassHandler()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    addTask() {
        this.setState(state => {
            return { addTaskClassName: state.addTaskClassName.replace("btn-success", "btn-warning") }
        })
    }

    removeCard() {
        this.setState(state => {
            return {
                cardCss: state.cardCss.replace('bounceIn', 'bounceOut')
            }
        })
    }

    startEllapsed() {
        this.intervalId = setInterval(() => {
            this.setState(state => {
                return { diff: timeAgoValue(this.initTime) }
            })
        }, 60000);
    }

    render() {
        const { cardCss, addTaskClassName, diff } = this.state
        const timeEllapsed = !diff ? 'Recently' : diff + ' min ago'
        return (
            <div className="container">
                <Modal title="probando" show/>
                <h1>Hello World, from React App!!</h1>
                <button className="btn btn-info"><FontAwesomeIcon icon="home" /> Okey</button>
                <br />
                <br />
                <div className={cardCss} style={{ width: 300 }}>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <div className="card-text">
                            <TodoItem title="Probando un todoItem"
                                strikeIt={true} color={{ done: '#ed1c24', default: '#ccc' }}
                                onChanged={(val) => console.log(val)} />
                        </div>
                        <h6 className="card-subtitle text-muted float-right mt-4">
                            <FontAwesomeIcon icon={faClock} /> {timeEllapsed}
                        </h6>
                    </div>
                    <div className="card-footer">
                        <a href="#" className={addTaskClassName} onClick={this.addTask}>Add Task</a>
                        <a href="#" className="btn btn-sm btn-danger float-right" onClick={this.removeCard}>Remove</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default App