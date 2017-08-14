import React, {Component } from 'react'
import QuizOptions from './QuizOptions'
import classNames from 'classnames'
import 'animate.css';



class Quiz extends Component {
    constructor(props){
        super(props);

        this.state = {
            riddle: {},
            correct: '',
            gameOver: false
        }
    }

    componentWillMount(){
        this.newGame();
    }

    randomNumber(min,max){
        return Math.floor(Math.random()*((max+1)-min) + min)
    }

    newGame() {


        let field1 = this.randomNumber(20,50);
        let field2 = this.randomNumber(20,50);
        let result = field1 + field2;

        let resultArray = this.generateRandomOptions(result);
        let randomIndex = this.randomNumber(0,3);
        resultArray.splice(randomIndex,0, result);

        let riddle = {
            resultArray,
            field1,
            field2,
            result
        }

        this.setState({ correct: '', gameOver: false, riddle });


    }

    generateRandomOptions(result) {
        let resultValue = 0;
        let randomNumberArray = []
        for(var i=1;i<=3;i++){
            randomNumberArray.push(this.randomNumber(1,19));
        }
        let resultOptions = []
        let addMore;
        for(var j=0;j<3;j++){
            addMore = this.randomNumber(0,1);
            if(addMore === 1) {
                resultValue = result + randomNumberArray[j];
            } else {
                resultValue = result - randomNumberArray[j];
            }
            resultOptions.push(resultValue)
        }

        return resultOptions;

    }

    renderMessage(){
        if(this.state.correct) {
            return <h3>Good job! Click the button below to play again</h3>
        } else {
            return <h3>Wrong! Click the button below for revenge</h3>
        }
    }


    renderOptions(){
        let that = this;
        if(this.state.riddle.resultArray) {
            return this.state.riddle.resultArray.map(option => {
                return <QuizOptions option={option} keepThis={that} />
            }
            )
        }
    }

    render(){
        let afterClass = classNames({
            'after': true,
            'hide': !this.state.gameOver,
            'correct': this.state.correct,
            'wrong': !this.state.correct,
            'animated': true,
            'slideInUp': this.state.gameOver
        })
        return (
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question">What is the sum of <span className="text-info">{this.state.riddle.field1}</span> and <span className="text-info">{this.state.riddle.field2}</span> ?</p>
                    <div className="options">
                        {this.renderOptions()}
                    </div>
                </div>
                <div className={afterClass}>
                    {this.renderMessage()}
                </div>

                <div className="play-again" onClick={() => this.newGame()}>
                    <a className="button">Play Again</a>
                </div>
            </div>
        )
    }
}

export default Quiz;
