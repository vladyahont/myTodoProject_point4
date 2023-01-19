import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoId1 = v1()
    const todoId2 = v1()

    const [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todoId1, title: 'What to learn', filter: 'all'},
        {id: todoId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoId1]: [{id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'TS', isDone: false}],
        [todoId1]: [{id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'TS', isDone: false}],

    })

    function removeTask(id: string, todoId: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string, todoId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }



    function changeFilter(value: FilterValuesType, todoId: string) {
        setFilter(value);
    }

    const changeStatus = (newId: string, newIsDone: boolean, todoId: string) => {
        setTasks(tasks.map( t => t.id === newId ? {...t, isDone: newIsDone} : t ))
    }

    return (
        <div className="App">
            {todolist.map( tl => {

                let tasksForTodolist = tasks;

                if (filter === "active") {
                    tasksForTodolist = tasks.filter(t => t.isDone === false);
                }
                if (filter === "completed") {
                    tasksForTodolist = tasks.filter(t => t.isDone === true);
                }

                return
            })}
            <Todolist title="What to learn"
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}/>
</div>
    );
}

export default App;
