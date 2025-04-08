import { createSlice } from '@reduxjs/toolkit';

export const todoStateSlice = createSlice({
  name: 'todoState', 
  initialState: { 
    todoTasksArr: [{id: "14752uz5j2o", title: "Заголовок", text: "текст...", completed: false, time: "05.05.2025: 15:55"}],
    inputValue: '',
    inputValueTitle: '',
    editTaskId: null,
    inputHandleValue: '',
    inputHandleValueTitle: '',
    inputTextBefore: '',
    inputTitleBefore: '', 
    isCheckDelete: false,
    allChecked: false,
  },  
  reducers: { 
    setTodoTasksArr: (state, action) => {
      state.todoTasksArr = action.payload;
    },
    setInputValue: (state, action) => {
      state.inputValue = action.payload; 
    },
    setInputValueTitle: (state, action) => {
        state.inputValueTitle = action.payload;
    },
    setEditTaskId: (state, action) => {
      state.editTaskId = action.payload;
    },
    setIsCheckDelete: (state, action) => { 
      state.isCheckDelete = action.payload;
    },
    setAllChecked: (state, action) => { 
      state.allChecked = action.payload;
    },
    setInputHandleValue: (state, action) => {
      state.inputHandleValue = action.payload; 
    },
    setInputHandleValueTitle: (state, action) => {
        state.inputHandleValueTitle = action.payload;
    },
    setInputTextBefore: (state, action) => {
      state.inputTextBefore = action.payload; 
    },
    setInputTitleBefore: (state, action) => {
        state.inputTitleBefore = action.payload;
    },

  },
});

export const { 
  setTodoTasksArr,
  setInputValue,
  setInputValueTitle,
  setEditTaskId,
  setIsCheckDelete, 
  setAllChecked, 
  setInputHandleValue, 
  setInputHandleValueTitle, 
  setInputTextBefore, 
  setInputTitleBefore  
} = todoStateSlice.actions;

export const selectTodoTasksArr = (state) => state.todoState.todoTasksArr;
export const selectInputValue = (state) => state.todoState.inputValue;
export const selectInputValueTitle = (state) => state.todoState.inputValueTitle;
export const selectEditTaskId = (state) => state.todoState.editTaskId;
export const selectIsCheckDelete = (state) => state.todoState.isCheckDelete;
export const selectAllChecked = (state) => state.todoState.allChecked;
export const selectInputHandleValue = (state) => state.todoState.inputHandleValue;
export const selectInputHandleValueTitle = (state) => state.todoState.inputHandleValueTitle;
export const selectInputTextBefore = (state) => state.todoState.inputTextBefore;
export const selectInputTitleBefore = (state) => state.todoState.inputTitleBefore;

export default todoStateSlice.reducer;