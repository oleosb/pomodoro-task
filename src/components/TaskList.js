import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

const TaskList = ({ tasks }) => {
  return (
    <div className={`${styles.taskList}`}>
      {tasks
        .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
        .map((task, idx) => (
          <TaskItem {...task} key={idx} />
        ))}
    </div>
  );
};

export default TaskList;
