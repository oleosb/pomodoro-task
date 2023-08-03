import {
  BsCircle,
  BsPlayCircle,
  BsFillCheckCircleFill,
  BsGear,
  BsDashCircle,
} from 'react-icons/bs';
import styles from './TaskItem.module.css';
import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

const TaskItem = ({ id, title, done }) => {
  const context = useContext(TaskContext);

  return (
    <div className={styles.taskItem}>
      <div>
        {!done ? (
          <button className={`icon`} onClick={() => context.toggleDone(id)}>
            <BsCircle />
          </button>
        ) : (
          <button className={`icon`} onClick={() => context.toggleDone(id)}>
            <BsFillCheckCircleFill />
          </button>
        )}
        <p>{title}</p>
      </div>
      <div>
        {!done && (
          <button
            className={`icon`}
            onClick={() => context.addPomodoroTask(id)}
          >
            <BsPlayCircle />
          </button>
        )}
        {!done && (
          <button className={`icon`}>
            <BsGear onClick={() => context.addConfigTask(id)} />
          </button>
        )}
        <button className={`icon`}>
          <BsDashCircle onClick={() => context.deleteTask(id)} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
