import React, { createContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([{
    id: nanoid(),
    title: 'teste',
    done: false,
    note: '',
    work: '25',
    small_break: '05',
    long_break: '15',
    cicles: 4,
    repeat: false,
  }
  ]);

  const [configTask, setConfigTask] = useState('');
  const [pomodoroTask, setPomodoroTask] = useState('');

  const addPomodoroTask = (id) => {
    const taskCopy = tasks.filter((task) => task.id === id);
    setPomodoroTask(...taskCopy);
  };

  const addConfigTask = (id) => {
    const taskCopy = tasks.filter((task) => task.id === id);
    setConfigTask(...taskCopy);
  };

  const addTask = (task) => {
    if (task) {
      const newTask = {
        id: nanoid(),
        title: task,
        done: false,
        note: '',
        work: '25',
        small_break: '05',
        long_break: '15',
        cicles: 4,
        repeat: false,
      };
      setTasks([...tasks, newTask]);
    }
  };

  const configureTask = (
    id,
    work,
    small_B,
    long_B,
    done,
    note,
    title,
    repeat,
  ) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach((task) => {
      if (task.id === id) {
        task.title = title;
        task.work = work;
        task.small_break = small_B;
        task.long_break = long_B;
        task.done = done;
        task.note = note;
        task.repeat = repeat;
        if (repeat) {
          task.cicles = 8;
        } else {
          task.cicles = 4;
        }
      }
    });
    setTasks([...tasks]);
    setConfigTask('');
  };

  const deleteTask = (id) => {
    const tasksCopy = tasks.filter((task) => task.id !== id);

    setTasks(tasksCopy);
  };

  const toggleDone = (id) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
    });

    setTasks(tasksCopy);
  };

  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem('local-tasks'));

    if (localTasks) {
      setTasks(localTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('local-tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleDone,
        addConfigTask,
        configTask,
        setConfigTask,
        configureTask,
        addPomodoroTask,
        pomodoroTask,
        setPomodoroTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
