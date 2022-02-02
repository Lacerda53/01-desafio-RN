import React, { useState } from 'react';
import { Alert, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const newValue: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(prevValue => [...prevValue, newValue])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prevValue => prevValue.map(item => (item.id === id ? { ...item, done: !item.done } : { ...item })))
  }

  function handleRemoveTask(id: number) {
    return Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            setTasks(prevValue => prevValue.filter(item => item.id !== id));
          },
        },
        {
          text: "Não",
        },
      ]
    );
  }

  function handleChangeTask(id: number, task: string) {
    setTasks(prevValue => prevValue.map(item => {

      if (item.id === id) {

        return {
          ...item,
          title: task
        }
      }
      return item;
    }))
  }

  return (
    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
      <>
        <Header tasksCounter={tasks.length} />

        <TodoInput addTask={handleAddTask} />

        <TasksList
          tasks={tasks}
          toggleTaskDone={handleToggleTaskDone}
          removeTask={handleRemoveTask}
          onChangeTask={handleChangeTask}
        />
      </>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})