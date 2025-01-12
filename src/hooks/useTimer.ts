import { useEffect, useState } from "react";
import useLevelSwitch from "./useLevelSwitch";
import usePlayingSwitch from "./usePlayingSwitch";
import setScore from "@/utils/setScore";

const useTimer = () => {
  const { currentLevel } = useLevelSwitch();
  const { currentPlayingState } = usePlayingSwitch();
  const { TITLE } = currentLevel;

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (currentPlayingState === "stale") {
      setTime(0);
      return;
    } else if (currentPlayingState === "success") {
      const highscore = localStorage.getItem("highscore");
      console.log(time, "time");
      setScore(TITLE, time, highscore);
      return;
    } else if (currentPlayingState === "gameOver") {
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    setTime((prev) => prev + 1);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentLevel, currentPlayingState]);

  const paddedTime = `${time}`.padStart(3, "0");
  return { paddedTime };
};

export default useTimer;
