import styles from './Pomodoro.module.css';
import {
  BsArrowLeft,
  BsPlayCircle,
  BsPauseCircle,
  BsStopCircle,
} from 'react-icons/bs';
import { useContext, useEffect, useRef, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import beep_audio from '../audio/beep.wav';

const Pomodoro = () => {
  const context = useContext(TaskContext);

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [isStoped, setIsStoped] = useState(false);
  const [bgColor, setBgColor] = useState('#3ea69a4d');
  const [barColor, setBarColor] = useState('#3ea69a');

  const [cicles, setCicles] = useState(0);

  let totalSeconds;
  let percentage;

  const timeRemainingRef = useRef(timeRemaining);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const ciclesRef = useRef(cicles);

  const clock = () => {
    timeRemainingRef.current--;
    setTimeRemaining(timeRemainingRef.current);
  };

  useEffect(() => {
    const resetClock = (done) => {
      setIsPaused(true);
      isPausedRef.current = true;
      setIsStoped(false);
      setBgColor('#3ea69a4d');
      setBarColor('#3ea69a');
      setMode('work');
      modeRef.current = 'work';
      context.configureTask(
        context.pomodoroTask.id,
        context.pomodoroTask.work,
        context.pomodoroTask.small_break,
        context.pomodoroTask.long_break,
        done,
        context.pomodoroTask.note,
        context.pomodoroTask.title,
        context.pomodoroTask.repeat,
      );
    };

    let beep = new Audio(beep_audio);

    const switchMode = () => {
      if (modeRef.current === 'work') {
        ciclesRef.current--;
        setCicles(ciclesRef.current);

        if (ciclesRef.current === 4 || ciclesRef.current === 0) {
          const nextMode = 'long_break';
          setMode(nextMode);
          modeRef.current = nextMode;

          const nextTime = context.pomodoroTask.long_break * 60;
          setTimeRemaining(nextTime);
          timeRemainingRef.current = nextTime;

          setBgColor('#ebca794d');
          setBarColor('#ebca79');
        } else {
          const nextMode = 'small_break';
          setMode(nextMode);
          modeRef.current = nextMode;

          const nextTime = context.pomodoroTask.small_break * 60;
          setTimeRemaining(nextTime);
          timeRemainingRef.current = nextTime;

          setBgColor('#ea80664d');
          setBarColor('#ea8066');
        }
      } else {
        const nextMode = 'work';
        setMode(nextMode);
        modeRef.current = nextMode;

        const nextTime = context.pomodoroTask.work * 60;
        setTimeRemaining(nextTime);
        timeRemainingRef.current = nextTime;

        setBgColor('#3ea69a4d');
        setBarColor('#3ea69a');
      }
    };

    timeRemainingRef.current = +context.pomodoroTask.work * 60;
    setTimeRemaining(timeRemainingRef.current);

    ciclesRef.current = context.pomodoroTask.cicles;
    setCicles(ciclesRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (isStoped) resetClock(false);

      if (timeRemainingRef.current === 0) {
        if (ciclesRef.current === 0) {
          resetClock(true);
        }
        return switchMode();
      }

      if (timeRemainingRef.current === 5) {
        beep.play();
      }

      clock();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    isStoped,
    context.pomodoroTask.small_break,
    context.pomodoroTask.work,
    context.pomodoroTask.cicles,
    context.pomodoroTask.long_break,
    context,
  ]);

  let minutes = Math.floor(timeRemaining / 60);
  if (minutes < 10) minutes = '0' + minutes;
  let seconds = timeRemaining % 60;
  if (seconds < 10) seconds = '0' + seconds;

  switch (mode) {
    case 'work':
      document.title = `${minutes}:${seconds} - Atividade`;
      totalSeconds = context.pomodoroTask.work * 60;
      percentage = Math.round((timeRemaining / totalSeconds) * 100);
      break;
    case 'small_break':
      document.title = `${minutes}:${seconds} - Pausa Curta`;
      totalSeconds = context.pomodoroTask.small_break * 60;
      percentage = Math.round((timeRemaining / totalSeconds) * 100);
      break;
    case 'long_break':
      document.title = `${minutes}:${seconds} - Pausa Longa`;
      totalSeconds = context.pomodoroTask.long_break * 60;
      percentage = Math.round((timeRemaining / totalSeconds) * 100);
      break;

    default:
      break;
  }

  return (
    <div
      className={styles.pomodoro}
      style={{
        background: `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${bgColor} 100%)`,
      }}
    >
      <div className={styles.header}>
        <button
          className={`${styles.closeBtn} ${styles.icon}`}
          onClick={() => context.setPomodoroTask('')}
        >
          <BsArrowLeft color={`${barColor}`} />
        </button>
        <p className={`${styles.title} title`} style={{ color: `${barColor}` }}>
          {context.pomodoroTask.title}
        </p>
      </div>
      <div className={styles.progress}>
        <CircularProgressbar
          className={styles.circularBar}
          value={percentage}
          text={`${minutes}:${seconds}`}
          styles={buildStyles({
            textColor: `${barColor}`,
            pathColor: `${barColor}`,
            trailColor: 'rgba(255, 255, 255, .3)',
            strokeWidth: 99,
          })}
        />
      </div>
      <div className={styles.btns}>
        {isPaused ? (
          <button
            className={`${styles.playBtn} ${styles.icon}`}
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          >
            <BsPlayCircle color={`${barColor}`} />
          </button>
        ) : (
          <button
            className={`${styles.playBtn} ${styles.icon}`}
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          >
            <BsPauseCircle color={`${barColor}`} />
          </button>
        )}
        <button
          className={`${styles.playBtn} ${styles.icon}`}
          onClick={() => setIsStoped(true)}
        >
          <BsStopCircle color={`${barColor}`} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
