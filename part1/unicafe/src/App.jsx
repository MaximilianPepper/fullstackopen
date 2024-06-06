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

  const feed1 = () => setGood(good + 1);
  const feed2 = () => setNeutral(neutral + 1);
  const feed3 = () => setBad(bad + 1);
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
    </div>
  );
};

export default App;
