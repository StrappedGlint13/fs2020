import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

  }
  const Header = (props) => {
    return (
      <div>
        <h1>
          {props.course}
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
        <Part title={props.course[0].name} exercises={props.course[0].exercises} />
        <Part title={props.course[1].name} exercises={props.course[1].exercises} />
        <Part title={props.course[2].name} exercises={props.course[2].exercises} />
      </div>
    )
  }
  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.course[0].exercises + props.course[1].exercises + props.course[2].exercises}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))