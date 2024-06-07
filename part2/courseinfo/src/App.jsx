const Content = ({ line }) => {
  const { name, exercises } = line;

  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Header = (props) => <h1>{props.title}</h1>;

const Course = (props) => {
  return (
    <div>
      <Header title={props.course.name} />
      {props.course.parts.map((line) => (
        <Content key={line.id} line={line} />
      ))}
      <p>
        total of{" "}
        {props.course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
        exercises
      </p>
    </div>
  );
};
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
