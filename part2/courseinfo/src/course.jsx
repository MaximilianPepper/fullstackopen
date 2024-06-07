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

export default Course;
