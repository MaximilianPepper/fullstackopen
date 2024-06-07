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
      <h3>
        total of{" "}
        {props.course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
        exercises
      </h3>
    </div>
  );
};
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  );
};

export default App;
