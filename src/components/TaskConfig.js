import styles from './TaskConfig.module.css';
import {
  BsCircle,
  BsPlayCircle,
  BsCheck2,
  BsFillCheckCircleFill,
  BsArrowLeft,
  BsDash,
  BsPlus,
} from 'react-icons/bs';
import { useState, useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const TaskConfig = () => {
  const context = useContext(TaskContext);

  const [work, setWork] = useState(context.configTask.work);
  const [small_break, setSmall_B] = useState(context.configTask.small_break);
  const [long_break, setLong_B] = useState(context.configTask.long_break);
  const [done, setDone] = useState(context.configTask.done);
  const [note, setNote] = useState(context.configTask.note);
  const [repeat, setRepeat] = useState(context.configTask.repeat);

  const handleDone = () => {
    setDone(!done);
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleNote = ({ target }) => {
    setNote(target.value);
  };

  const handleIncrease = (data, setData) => {
    let num;
    if (data >= 59) {
      num = 59;
    } else {
      num = +data + 1;
    }

    if (num < 10) num = '0' + num;
    setData(num);
  };

  const handleDecrease = (data, setData) => {
    let num;
    if (data <= 1) {
      num = 1;
    } else {
      num = +data - 1;
    }

    if (num < 10) num = '0' + num;
    setData(num);
  };

  return (
    <section className={styles.config}>
      <div className={styles.header}>
        <button
          className={`${styles.closeBtn} ${styles.icon}`}
          onClick={() => context.setConfigTask('')}
        >
          <BsArrowLeft />
        </button>
        <h1 className="title">{context.configTask.title}</h1>
        <button
          className={`${styles.okBtn} ${styles.icon}`}
          onClick={() =>
            context.configureTask(
              context.configTask.id,
              work,
              small_break,
              long_break,
              done,
              note,
              context.configTask.title,
              repeat,
            )
          }
        >
          <BsCheck2 />
        </button>
      </div>
      <div className={styles.settings}>
        <div>
          <p>Atividade</p>
          <div className={styles.time}>
            <button
              className={`${styles.icon} ${styles.chevron}`}
              onClick={() => handleDecrease(work, setWork)}
            >
              <BsDash />
            </button>
            <p>{work}:00</p>
            <button
              className={`${styles.icon} ${styles.chevron}`}
              onClick={() => handleIncrease(work, setWork)}
            >
              <BsPlus />
            </button>
          </div>
        </div>
        <div>
          <p>Pausa curta</p>
          <div className={styles.time}>
            <button
              className={`${styles.icon} ${styles.chevron}`}
              onClick={() => handleDecrease(small_break, setSmall_B)}
            >
              <BsDash />
            </button>
            <p>{small_break}:00</p>
            <button
              className={`${styles.icon} ${styles.chevron}`}
              onClick={() => handleIncrease(small_break, setSmall_B)}
            >
              <BsPlus />
            </button>
          </div>
        </div>
        <div>
          <p>Pausa longa</p>
          <div className={styles.time}>
            <button
              className={`${styles.icon} ${styles.chevron}`}
              onClick={() => handleDecrease(long_break, setLong_B)}
            >
              <BsDash />
            </button>
            <p>{long_break}:00</p>
            <button
              className={`${styles.icon} ${styles.chevron}`}
              onClick={() => handleIncrease(long_break, setLong_B)}
            >
              <BsPlus />
            </button>
          </div>
        </div>
        <div>
          <p>Repetir</p>
          {!repeat ? (
            <button className={`icon`} onClick={() => handleRepeat()}>
              <BsCircle />
            </button>
          ) : (
            <button className={`icon`} onClick={() => handleRepeat()}>
              <BsFillCheckCircleFill />
            </button>
          )}
        </div>
        <div>
          <p>Concluída</p>
          {!done ? (
            <button className={`icon`} onClick={() => handleDone()}>
              <BsCircle />
            </button>
          ) : (
            <button className={`icon`} onClick={() => handleDone()}>
              <BsFillCheckCircleFill />
            </button>
          )}
        </div>
        <textarea
          name="notesarea"
          id="notesarea"
          placeholder="Adicione uma nota..."
          value={note}
          onChange={(e) => handleNote(e)}
        ></textarea>
      </div>
      <button
        className={`${styles.playBtn}`}
        onClick={() => {
          if (!done) {
            context.configureTask(
              context.configTask.id,
              work,
              small_break,
              long_break,
              done,
              note,
              context.configTask.title,
              repeat,
            );
            context.addPomodoroTask(context.configTask.id);
            context.setConfigTask('');
          }
        }}
      >
        <BsPlayCircle />
      </button>
    </section>
  );
};

export default TaskConfig;
