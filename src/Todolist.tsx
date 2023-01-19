import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'
import Checkbox from "./components/Checkbox";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (newId: string, newIsDone: boolean)=> void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const [nameButton, setNameButton] = useState<FilterValuesType>('all')

    const addTask = () => {
        if (title.trim()  !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('ERRRRRooorRR')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all");
        setNameButton('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active");
        setNameButton('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed");
        setNameButton('completed')
    }

    const changeIsDoneHandler = (newId: string, newIsDone: boolean) => {
        props.changeStatus(newId, newIsDone)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''} value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            { error && <div className={error ? s.errorMessoge : ''}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    // const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                    //     props.changeStatus(t.id, event.currentTarget.checked)
                    // }

                    return <li className={t.isDone ? s.isDone : ''} key={t.id}>
                        <Checkbox checked={t.isDone} callback={(newIsDone) => changeIsDoneHandler(t.id, newIsDone)}/>
                        {/*<input type="checkbox" checked={t.isDone} onChange={(event) => changeIsDoneHandler(t.id, event.currentTarget.checked)}/>*/}
                        <span>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={nameButton === 'all' ? s.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={nameButton === 'active' ? s.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={nameButton === 'completed' ? s.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
