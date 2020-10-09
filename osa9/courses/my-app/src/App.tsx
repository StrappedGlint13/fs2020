import React, {  } from "react";


const Header: React.FC<{ courseName: string}> = ({courseName}) => {
  return <h1> {courseName} </h1>;
}

const Content: React.FC<{ courseParts: CoursePart[]}> = ({courseParts}) => {
  return (
    <div>
    {courseParts.map((course: CoursePart) =>
          <Part key={course.name} part={course} />
    )}
  </div>
    )
}

const Total: React.FC<{ total: number}> = ({total}) => {
    return(
      <p>
        Number of exercises {total}
      </p>
    )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart}> = ({part}) => {
    switch (part.name) {
      case "Fundamentals":
        return(
          <p>
          <b>{part.name}</b>
          <br></br>
          exercises: {part.exerciseCount}
          <br></br>
          description: {part.description}
        </p>
        )   
      case "Using props to pass data":
        return(
          <p>
          <b>{part.name}</b>
          <br></br>
          exercises: {part.exerciseCount}
          <br></br>
          groupProjectCount: {part.groupProjectCount}
        </p>
        )
      case "Deeper type usage":
        return (
          <p>
          <b>{part.name}</b>
          <br></br>
          exercises: {part.exerciseCount}
          <br></br>
          exerciseSubmissionLink: {part.exerciseSubmissionLink}
          <br></br>
          description: {part.description}
        </p>
        )
      case "Calculation models":
        return (
          <p>
          <b>{part.name}</b>
          <br></br>
          exercises: {part.exerciseCount}
          <br></br>
          description: {part.description}
          <br></br>
          frustration level: {part.frustrationLevel}
        </p>
        )
      default:
      return assertNever(part);
    }
}

interface CoursePartWithDescription {
  description: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase, CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase, CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase, CoursePartWithDescription {
  name: "Calculation models"
  frustrationLevel: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Calculation models",
      exerciseCount: 33,
      description: "Modelling some calculations",
      frustrationLevel: 0
    }
  ];

  const total = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)


  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total total={total} />
    </div>
  );
};

export default App;
