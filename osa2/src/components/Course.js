import React from 'react'

const Course = ({course}) => {
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
         {props.course.parts.map(course => 
        <p key={course.id}>
          {course.name} {course.exercises}
        </p>)}
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <b>
        total of {props.total.parts.reduce((sum, ex) => sum + ex.exercises, 0  
        )} exercises
      </b>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
         <Part course={props.content} />
         <Total total={props.content} />
      </div>
    )
  }

  export default Course