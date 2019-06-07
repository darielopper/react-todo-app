import React from "react"
import propTypes from "prop-types"

const Effects = {
    bounceIn: 'bounceIn',
    bounceInDown: 'bounceInDown',
    bounceInLeft: 'bounceInLeft',
    bounceInRight: 'bounceInRight',
    bounceInUp: 'bounceInUp',
    bounceOut: 'bounceOut',
    rotateIn: 'rotateIn',
    rotateOut: 'rotateOut',
    fadeIn: 'fadeIn',
    fadeInLeft: 'fadeInLeft',
    fadeInRight: 'fadeInRight',
    fadeInTop: 'fadeInTop',
    fadeInDown: 'fadeInDown',
    fadeOut: 'fadeOut',
    flipInX: 'flipInX',
    flipInY: 'flipInY',
    flipOutX: 'flipOutX',
    flipOutY: 'flipOutY',
    lightSpeedIn: 'lightSpeedIn',
    lightSpeedOut: 'lightSpeedOut',
    rotateInDownLeft: 'rotateInDownLeft',
    rotateInDownRight: 'rotateInDownRight',
    rotateInUpLeft: 'rotateInUpLeft',
    rotateInUpRight: 'rotateInUpRight',
    rotateOutDownLeft: 'rotateOutDownLeft',
    rotateOutDownRight: 'rotateOutDownRight',
    rotateOutUpLeft: 'rotateOutUpLeft',
    rotateOutUpRight: 'rotateOutUpRight',
    slideInDown: 'slideInDown',
    slideInLeft: 'slideInLeft',
    slideInRight: 'slideInRight',
    slideOutLeft: 'slideOutLeft',
    slideOutRight: 'slideOutRight',
    slideOutUp: 'slideOutUp',
    slideInUp: 'slideInUp',
    slideOutDown: 'slideOutDown',
    rollIn: 'rollIn',
    rollOut: 'rollOut',
}

class Template extends React.Component {
    static defaultProps = {
        show: false,
        effect: 'fade'
    }

    static propTypes = {
        show: propTypes.bool,
        effect: propTypes.oneOfType([
            propTypes.string,
            propTypes.object
        ])
    }

    state = {
        divClass: 'animated'
    }

    constructor(props) {
        super(props)
    }

    splitCamelCase = (str) => {
        if(typeof str !== 'string') {
            return []
        }
        let split = str.split(/[A-Z]/g);
        const matches = str.match(/[A-Z]/g)
        for (let i = 1; i < split.length; i++) {
            split[i] = matches[i - 1] + split[i];
        }

        return split;
    }

    opposite = (dir) => {
        const positiveDir = [
            'Left', 'Top', 'Up', 'In'
        ]
        const negativeDir = [
            'Right', 'Bottom', 'Down', "Out"
        ]

        const foundInPositive = positiveDir.indexOf(dir)
        const foundInNegative = negativeDir.indexOf(dir)

        if (foundInPositive >= 0) {
            return negativeDir[foundInPositive]
        }
        if (foundInNegative >= 0) {
            return positiveDir[foundInNegative]
        }

        return false
    }

    obtainOutEffect = (dir) => {
        let parts = this.splitCamelCase(this.props.effect)
        parts.pop()
        return parts.join('') + dir
    }

    updateAnimation = () => {
        this.setState(state => {
            const opposite = this.opposite(this.splitCamelCase(this.props.effect).pop())
            const effect = typeof this.props.effect === 'string'
                ? { in: this.props.effect, out: !!opposite ? this.obtainOutEffect(opposite) : 'fadeOut' }
                : this.props.effect
            const whichOne = this.props.show ? effect.in : effect.out
            return {
                divClass: `animated ${whichOne}`
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show !== this.props.show) {
            this.updateAnimation()
        }
    }

    componentDidMount() {
        this.updateAnimation()
    }

    render() {
        return (
            <div className={this.state.divClass}>
                {this.props.children}
            </div>
        )
    }
}

export {Template, Effects}