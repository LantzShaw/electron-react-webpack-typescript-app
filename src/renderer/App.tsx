import { FC, useState } from "react";

const App: FC = () => {
  const [count, setCount] = useState(0);

  const onIncreaseClick = () => {
    setCount(count + 1);
  }

  const onDecreaseClick = () => {
    setCount(count - 1);
  }

  return <>
    <h2>App Screen</h2>
    <p>{count}</p>
    <button onClick={onDecreaseClick}>Decrease</button>
    <button onClick={onIncreaseClick}>Increase</button>
  </>;
};

export default App;
