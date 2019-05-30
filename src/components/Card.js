import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
const classnames = require('classnames')

class Card extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            cardCss: ['card', 'bg-default', 'animated', 'bounceIn', 'mt-5']
        }
    }

    removeCard() {

    }

    hasAnyTask() {
        return this.props.tasks && this.props.tasks.length
    }

    render() {
        const timeEllapsed = "Recently"
        const {cardCss} = this.state
        return (
            <div className={classnames(cardCss)} style={{ width: 300 }}>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <div className="card-text">
                        {this.props.children}
                    </div>
                    <h6 className="card-subtitle text-muted float-right mt-4">
                        {this.hasAnyTask() && (
                            this.props.tasks.each(item => {
                                <TodoItem title={item.title}
                                    strikeIt={item.strikeIt} color={item.color}
                                    onChanged={(val) => console.log(val)} />
                            })
                        )}
                    </h6>
                </div>
                <div className="card-footer">
                    <a href="#" className={classnames('btn', 'btn-sm', 'btn-success')}>Add Task</a>
                    <a href="#" className="btn btn-sm btn-danger float-right" onClick={() => this.removeCard}>Remove</a>
                </div>
            </div>
        )
    }
}

export default Card