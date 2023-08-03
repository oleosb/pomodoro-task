import React, { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { BsPlusCircle } from 'react-icons/bs';
import styles from './AddTask.module.css';

const AddTask = () => {
  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask('');
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <input
        type="text"
        name="taskInpt"
        id="taskInpt"
        placeholder="Adicione uma tarefa..."
        value={task}
        onChange={({ target }) => setTask(target.value)}
      />
      <button className={`${styles.addBtn} icon`}>
        <BsPlusCircle />
      </button>
    </form>
  );
};

export default AddTask;
