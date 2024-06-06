import { useState } from "react";

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
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const feed1 = () => {
    setGood(good + 1);
    const good1 = good + 1;
    setTotal(good1 + neutral + bad);
    const total1 = total + 1;
    setAverage((good1 - bad) / total1);
    setPositive((good1 / total1) * 100);
  };
  const feed2 = () => {
    setNeutral(neutral + 1);
    const neutral1 = neutral + 1;
    setTotal(good + neutral1 + bad);
    const total1 = total + 1;
    setAverage((good - bad) / total1);
    setPositive((good / total1) * 100);
  };
  const feed3 = () => {
    setBad(bad + 1);
    const bad1 = bad + 1;
    setTotal(good + bad1 + neutral);
    const total1 = total + 1;
    setAverage((good - bad1) / total1);
    setPositive((good / total1) * 100);
  };
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={feed1} text={"good"} />
      <Button onClick={feed2} text={"neutral"} />
      <Button onClick={feed3} text={"bad"} />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
  );
};

export default App;
