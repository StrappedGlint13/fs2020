import React from 'react';
import ReactDOM from 'react-dom'

const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content content={course} />
            <Total total={course} />
        </div>
    )
}
const Header = (props) => {
    return (
        <div>
            <h3>
                {props.header}
            </h3>
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <b>Total of {props.total.parts.reduce(function(sum, excersice){
        return sum + excersice.exercises
    }, 0)} exercises </b>
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
    const courses = [
    {
      name: 'Half Stack application development',
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]



    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))
