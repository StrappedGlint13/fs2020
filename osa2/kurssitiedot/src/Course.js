import React from 'react'

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

export default Course