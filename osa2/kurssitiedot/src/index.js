import React from 'react';
import ReactDOM from 'react-dom'

const Course = ({ course }) => {

    return (
        <div>
            <Header header={course.name} />
            <Content content={course.parts} />
        </div>
    )
}
const Header = (props) => {
    return (
        <div>
            <h1>
                {props.header}
            </h1>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.title} {props.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part title={props.content[0].name} exercises={props.content[0].exercises} />
            <Part title={props.content[1].name} exercises={props.content[1].exercises} />
            <Part title={props.content[2].name} exercises={props.content[2].exercises} />
        </div>
    )
}



const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Course course={course} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))
