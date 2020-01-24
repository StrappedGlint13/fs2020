import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const StatisticsLine = (props) => {
    return (
        <div>
          {props.text} {props.value}
        </div>
      )    
}

const Statistics = (props) => {
    let all = props.good + props.neutral + props.bad
    let average = (props.good - props.bad) / (props.good + props.bad + props.neutral)
    let positive = props.good / (props.good + props.neutral + props.bad) + " %"

    if (all === 0) {
        return (
            <div>
              No feedback given
            </div>
          )    
    }

return(
    <div>
    <StatisticsLine text="good" value={props.good}> </StatisticsLine> 
    <StatisticsLine text="neutral" value={props.neutral}> </StatisticsLine> 
    <StatisticsLine text="bad" value={props.bad}> </StatisticsLine> 
    <StatisticsLine text="average" value={average}> </StatisticsLine> 
    <StatisticsLine text="positive" value={positive}> </StatisticsLine> 
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