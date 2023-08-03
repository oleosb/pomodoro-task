import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import TaskList from './TaskList';
import AddTask from './AddTask';
import styles from './TaskApp.module.css';
import TaskConfig from './TaskConfig';
import Pomodoro from './Pomodoro';

const TaskApp = () => {
  const context = useContext(TaskContext);

  
  document.title = `Pomodoro Task`

  return (
    <main className={styles.taskApp}>
      {!context.configTask && !context.pomodoroTask && (
        <>
          {' '}
          <AddTask />
          <div className={`${styles.todoContainer}`}>
            <h1 className="title">A fazer</h1>
            <TaskList tasks={context.tasks.filter(({ done }) => !done)} />
          </div>
          <div className={styles.doneContainer}>
            <h1 className="title">Concluídas</h1>
            <TaskList tasks={context.tasks.filter(({ done }) => done)} />
          </div>
        </>
      )}
      {context.configTask && !context.pomodoroTask && (
        <>
          {' '}
          <TaskConfig />
        </>
      )}

      {!context.configTask && context.pomodoroTask && <Pomodoro />}
    </main>
  );
};

export default TaskApp;
