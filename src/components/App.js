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
        <TodoItem title="Probando un todoItem" />
    </div>
)

export default App