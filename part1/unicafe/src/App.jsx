import { useState } from "react";

const StatisticsLine = (props) => {
  return (
    <>
      <p>
        {props.text} {props.value}
      </p>
    </>
  );
};
const Statistics = (props) => {
  if (props.total === 0) return <p>No feedback given</p>;
  return (
    <>
      <StatisticsLine text={"good"} value={props.good} />
      <StatisticsLine text={"neutral"} value={props.neutral} />
      <StatisticsLine text={"bad"} value={props.bad} />
      <StatisticsLine text={"all"} value={props.total} />
      <StatisticsLine
        text={"average"}
        value={(props.good - props.bad) / props.total}
      />
      <StatisticsLine
        text={"positive"}
        value={(props.good / props.total) * 100 + "%"}
      />
    </>
  );
};
const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>{props.text}</button>
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const feed1 = () => {
    setGood(good + 1);
    const good1 = good + 1;
    setTotal(good1 + neutral + bad);
  };
  const feed2 = () => {
    setNeutral(neutral + 1);
    const neutral1 = neutral + 1;
    setTotal(good + neutral1 + bad);
  };
  const feed3 = () => {
    setBad(bad + 1);
    const bad1 = bad + 1;
    setTotal(good + bad1 + neutral);
  };
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={feed1} text={"good"} />
      <Button onClick={feed2} text={"neutral"} />
      <Button onClick={feed3} text={"bad"} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
