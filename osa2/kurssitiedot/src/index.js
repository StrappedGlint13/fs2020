import React from 'react';
import ReactDOM from 'react-dom'

const Course = ({ course }) => {

    return (
        <div>
            <Header header={course.name} />
            <Content content={course} />

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
            {props.course.parts.map(course => <p key={course.id}> 
                     {course.name} {course.exercises}
                </p>)}
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part course={props.content} />
        </div>
    )
}




const App = (props) => {

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
