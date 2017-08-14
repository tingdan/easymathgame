import React, { Component } from 'react'

class QuizOptions extends Component {

    onClickOption() {
        let props = this.props;

        if(props.keepThis.state.riddle.result === props.option) {
            this.props.keepThis.setState({ correct: true, gameOver: true })
        } else {
            this.props.keepThis.setState({ correct: false, gameOver: true })
        }

    }

    render() {
        return (
            <div className="fields animated zoomIn" >
                <div className="field-block" onClick={() => this.onClickOption() }>{this.props.option}</div>
            </div>
        )
    }
}

export default QuizOptions;
