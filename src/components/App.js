import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCode, faHome, faEdit, faClock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TodoItem from "./TodoItem"
import Card from "./Card"
import { initClassHandler, timeAgoValue } from "../utils"

library.add(faCode, faHome)

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addTaskClassName: "btn btn-sm btn-success",
            cardCss: "card bg-default animated bounceIn mt-5",
            diff: 0,
            todo: {
                compra_nueva: [
                    { title: 'Detergente para lavar', strikeIt: true }
                ]
            }
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

    removeCard(id) {
        alert('removing card: '+id)
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
        const todoData = this.state.todo
        return (
            <div className="container">
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
                        <a href="#" className="btn btn-sm btn-danger float-right">Remove</a>
                    </div>
                </div>
                {Object.keys(todoData).map(item =>
                    <Card category={item.ucWords()} key={item}
                        tasks={todoData[item]} onRemove={() => this.removeCard(item)} />
                )}
            </div>
        )
    }
}

export default App