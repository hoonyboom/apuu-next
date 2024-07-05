import { Dispatch, SetStateAction, useEffect } from "react";

type TimerProps = {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  setIsTimer: Dispatch<SetStateAction<boolean>>;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default function Timer({ count, setCount, setIsTimer }: TimerProps) {
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(id);
      setIsTimer(false);
    }
    return () => clearInterval(id);
  }, [count]);

  return <span>{formatTime(count)}</span>;
}
