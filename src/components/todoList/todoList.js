'use strict'

import React, { useEffect, useRef  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setTodoTasksArr,
    setInputValue,
    setInputValueTitle,
    setEditTaskId,
    setIsCheckDelete, 
    setAllChecked, 
    setInputHandleValue, 
    setInputHandleValueTitle, 
    setInputTextBefore, 
    setInputTitleBefore,
    selectTodoTasksArr,
    selectInputValue,
    selectInputValueTitle,
    selectEditTaskId,
    selectIsCheckDelete,
    selectAllChecked,
    selectInputHandleValue,
    selectInputHandleValueTitle,
    selectInputTextBefore,
    selectInputTitleBefore ,
} from '../../slices/todoSlice';

  import DeleteIcon from '@mui/icons-material/Delete';
  import IconButton from '@mui/material/IconButton';
  import EditIcon from '@mui/icons-material/Edit';
  import Button from '@mui/material/Button';
  import TextField from '@mui/material/TextField';
  import Checkbox from '@mui/material/Checkbox';

import "./todoList.scss";

export default () => {
    const todoListRef = useRef(null);

    const todoTasksArr = useSelector(selectTodoTasksArr);
    const inputValueTitle = useSelector(selectInputValueTitle);
    const inputValue = useSelector(selectInputValue);
    const editTaskId = useSelector(selectEditTaskId);
    const isCheckDelete = useSelector(selectIsCheckDelete);
    const allChecked = useSelector(selectAllChecked);
    const inputHandleValue = useSelector(selectInputHandleValue);
    const inputHandleValueTitle = useSelector(selectInputHandleValueTitle);
    const inputTextBefore = useSelector(selectInputTextBefore);
    const inputTitleBefore = useSelector(selectInputTitleBefore);

    const dispatch = useDispatch();
 
    function generateRandomId() {
        const randomNumber = Math.floor(Math.random() * 100000);
        const randomLetters = Math.random().toString(36).substring(2, 8);
        return randomNumber + randomLetters;
    }

    function getCurrentTime() {
        const now = new Date();
        const [hours, minute] = now.toLocaleTimeString({ hour12: false, hour: '2-digit', minute: '2-digit' }).split(':');
        return [ hours, minute];
    }

    function getCurrentDay() {
        const now = new Date();
        return now.toLocaleDateString('uk-UA', { month: 'numeric', day: 'numeric', year: 'numeric' });
    }

    function addTodo() {
        const [hours, minute] = getCurrentTime();
        const day = getCurrentDay();

        if (!inputValueTitle || !inputValue) {
            alert("all text fields must be filled in!");
            return;
        }

        const newTask = {
            id: generateRandomId(),
            title: inputValueTitle.trim(),
            text: inputValue.trim(),
            completed: false,
            time: `${day}: ${hours}:${minute}`
        };

        dispatch(setTodoTasksArr([...todoTasksArr, newTask]));
        dispatch(setInputValue(null));
        dispatch(setInputValueTitle(null));
    }

    function handleChange(id, event) {

        const newTodoTask = todoTasksArr.map(task =>
            task.id === id 
            ? { 
                ...task, 
                completed: event.target.checked 
            } 
            : task
        );
        dispatch(setTodoTasksArr(newTodoTask));
    }

    function handleEdit(id) {
        const taskToEdit = todoTasksArr.find(task => task.id === id);

        if (taskToEdit) {
            dispatch(setInputHandleValue(taskToEdit.text.trim()));
            dispatch(setInputTextBefore(taskToEdit.text.trim()));
            dispatch(setInputHandleValueTitle(taskToEdit.title.trim()));
            dispatch(setInputTitleBefore(taskToEdit.title.trim()));
        }
        dispatch(setEditTaskId(id));
    }

    function saveEdit(id) {
        if (!inputHandleValue.trim() || !inputHandleValueTitle.trim()) {
            alert("text field cannot be empty");
            return;
        }

        if (inputTextBefore === inputHandleValue.trim() && inputTitleBefore === inputHandleValueTitle.trim()) {
            alert("changes are required to confirm");
            return;
        }

        const [hours, minute] = getCurrentTime();
        const day = getCurrentDay();

        const newTodoTask = todoTasksArr .map(task =>
            task.id === id 
            ? { 
                ...task, 
                title: inputHandleValueTitle, 
                text: inputHandleValue, 
                time: `corrected ${day} at ${hours}:${minute}`
            } 
            : task
        );

        dispatch(setTodoTasksArr(newTodoTask));
        dispatch(setEditTaskId(null));
    }

    function checkAllTasks() {
        const shouldCheckAll = !allChecked;

        const newTodoTask =  todoTasksArr.map((task) => ({
            ...task,
            completed: shouldCheckAll, 
        }));

        dispatch(setTodoTasksArr(newTodoTask));
    }

    function deleteTasks() {
        if (confirm("Do you want to delete the selected messages?")) {
            const newTodoTask =  todoTasksArr.filter(task => !task.completed);
            dispatch(setTodoTasksArr(newTodoTask));
        }
    }

    useEffect(() => {
        dispatch(setIsCheckDelete(todoTasksArr.some(task => task.completed)));
        dispatch(setAllChecked(todoTasksArr.every(task => task.completed)));
        
    }, [todoTasksArr]);

    useEffect(() => {
        if (todoListRef.current) {
            todoListRef.current.scrollTop = todoListRef.current.scrollHeight;
        }
    }, [inputValue]);

    return (
        <div className='todo-wrap'>
            <h2>Todo-List</h2>

            <div className="todo-block">
                {isCheckDelete && (
                    <div className='select-block'>
                         <IconButton aria-label="delete">
                            <DeleteIcon
                                sx={{
                                transition: '0.5s ease',
                                '&:hover': {
                                    transform: 'scale(1.05) rotate(15deg)', 
                                    color: 'error.main',
                                },
                                }}

                                onClick={deleteTasks}
                            />
                        </IconButton>
                        <Button variant="contained" sx={{ width: '120px', minWidth: 'auto', fontSize: '8px', fontWeight: 'bold' }} onClick={checkAllTasks}>{allChecked ? "Remove selection" : "Select all"}</Button>
                    </div>
                )}

                <ul className="todo-list" ref={todoListRef}>
                    {todoTasksArr.map((task) => (
                        <li key={task.id}
                            className={task.completed ? "todo-item check-bg" : "todo-item"}
                            data-id={task.id}
                        >
                            {editTaskId === task.id ? (
                                <React.Fragment>
                                    <TextField
                                        label="Title" 
                                        value={inputHandleValueTitle}
                                        onChange={(e) => dispatch(setInputHandleValueTitle(e.target.value))}
                                    />

                                    <TextField
                                        label="Text"
                                        multiline
                                        fullWidth
                                        value={inputHandleValue}
                                        onChange={(e) => dispatch(setInputHandleValue(e.target.value))}
                                    />
                                    <div className='todo-item-controls edit-controls'>
                                        <Button variant="contained" size="small" sx={{width: '40px', minWidth: 'auto'}} onClick={() => saveEdit(task.id)}>✓</Button>
                                        <Button variant="contained" size="small" sx={{width: '40px', minWidth: 'auto'}} onClick={() => dispatch(setEditTaskId(null))}>X</Button>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <div className='todo-item-notification'>
                                        <div className="todo-item-title">{task.title}</div>
                                        <div className="todo-item-text">{task.text}</div>
                                    </div>  

                                    <div className='todo-item-controls-wrap'>
                                        <div className='todo-item-controls'> 
                                            <EditIcon 
                                                sx={{ 
                                                    transform: 'scale(0.8)',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.5s ease-in-out',
                                                    '&:hover': {
                                                        transform: 'scale(0.9)',
                                                    }
                                                }} 
                                                onClick={() => handleEdit(task.id)}
                                            />
                                            <Checkbox
                                                size="small"
                                                checked={Boolean(task.completed)}
                                                onChange={(event) => handleChange(task.id, event)} 
                                            />
                                        </div>
                                        
                                        <div className="todo-item-time">{task.time}</div>
                                    </div>
                                </React.Fragment>
                            )}
                            
                        </li>
                    ))}
                </ul>

                <div className="todo-add-block">
                    <div className='todo-add-inputs'>
                        <TextField
                            fullWidth 
                            label="Title" 
                            value={inputValueTitle ?? ''}
                            onChange={(e) => dispatch(setInputValueTitle(e.target.value))}
                        />

                        <TextField
                            label="Text"
                            multiline
                            maxRows={4}
                            value={inputValue ?? ''}
                            onChange={(e) => dispatch(setInputValue(e.target.value))}
                        />
                    </div>
                    <Button variant="contained" onClick={addTodo}>Add</Button>
                </div>
            </div>
        </div>
    );
}

