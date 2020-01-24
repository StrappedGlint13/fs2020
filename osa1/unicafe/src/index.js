import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {

return(
    <div>
    <div>good: {props.good} </div> 
    <div>neutral: {props.neutral}</div> 
    <div>bad: {props.bad}</div>
    <div>all: {(props.good + props.neutral + props.bad)}</div>
    <div>average: {((props.good - props.bad) / (props.good + props.bad + props.neutral))}</div>
    <div>positive: {(props.good / (props.good + props.neutral + props.bad))} %</div>
    </div>
)

}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const increaseGood = () => {
        setGood(good + 1)
    }
    const increaseNeutral = () => {
        setNeutral(neutral + 1)
    }
    const increaseBad = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <h1>
                give feedback
      </h1>
            <Button handleClick={increaseGood} text='good' />
            <Button handleClick={increaseNeutral} text='neutral' />
            <Button handleClick={increaseBad} text='good' />
            <h1>
                statistics
      </h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
         
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)