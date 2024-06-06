import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length));
  const [top, setTop] = useState(0);
  const getRandomNumber = () => {
    setSelected(Math.round(Math.random() * (anecdotes.length - 1)));
  };

  const topVoted = (arr) => {
    let highest = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[highest]) highest = i;
    }
    return highest;
  };
  const voteSelected = () => {
    const copy = [...points];
    copy[selected] += 1;

    setPoints(copy);
    const top1 = topVoted(copy);
    setTop(top1);
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button onClick={voteSelected} text={"vote"} />
      <Button onClick={getRandomNumber} text={"next anectode"} />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[top]}</p>
      <p>has {points[top]} votes</p>
    </div>
  );
};

export default App;
