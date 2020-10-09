import React, {  } from "react";


interface PartProps {
  name: string;
  exerciseCount: number;
}


const Header: React.FC<{ courseName: string}> = ({courseName}) => {
  return <h1> {courseName} </h1>;
}

const Content: React.FC<{ courseParts: PartProps[]}> = ({courseParts}) => {
  return (
    <div>
    {courseParts.map((course: PartProps) => (
        <p>
          {course.name} {course.exerciseCount}
      </p>
    ))}
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

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
