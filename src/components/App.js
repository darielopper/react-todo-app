import React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCode, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TodoItem from "./TodoItem"

library.add(faCode, faHome)

const App = () => (
    <div className="container">
        <h1>Hello World, from React App!!</h1>
        <button className="btn btn-info"><FontAwesomeIcon icon="home" /> Okey</button>
        <br />
        <TodoItem title="Probando un todoItem" strikeIt={true} color={{ done: '#ed1c24', default: '#ccc' }} />

        <div className="card bg-default" style={{ width: 300 }}>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <h6 class="card-subtitle text-muted float-right">Updated 2 min ago</h6>
            </div>
            <div className="card-footer">
                <a href="#" className="btn btn-xs btn-success">Add Task</a>
                <a href="#" className="btn btn-xs btn-danger float-right">Remove</a>
            </div>
        </div>
    </div>
)

export default App