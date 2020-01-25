import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [voted, setVoted] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
    const [mostVotes, setMost] = useState(0)

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * 5))

    }
    const vote = () => {
        const copy = {...voted}
        copy[selected] += 1
        setVoted(copy)

        if (copy[selected] > copy[mostVotes]) {
            setMost(selected)
        }

    }

    return (
        <div>
            <h2>Anecdote of the day</h2>
            {props.anecdotes[selected]}
            <div>
                <div>has {voted[selected]} votes</div>
                <Button handleClick={vote} text={'Vote'} />
                <Button handleClick={nextAnecdote} text={'Next anecdote'} />
            </div>
            <h2>Anecdote with most votes</h2>
            {props.anecdotes[mostVotes]}
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)