import React, { ChangeEvent } from 'react';

type InputType = {
    checked: boolean
    callback: (newIsDone: boolean) => void
}

const Checkbox: React.FC<InputType> = (props) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }
    return (
        <div>
            {/*<input type="checkbox" checked={t.isDone} onChange={(event) => onChangeHandler(t.id, event.currentTarget.checked)}/>*/}
            <input type="checkbox" checked={props.checked} onChange={onChangeHandler}/>
        </div>
    );
};

export default Checkbox;