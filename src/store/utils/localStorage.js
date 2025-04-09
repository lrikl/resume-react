const STORAGE_KEY = 'RESUME_DATA_STORAGE';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return;
    }
    const parsedState = JSON.parse(serializedState);
    return { 
      todoState: {todoTasksArr: parsedState.todoTasks},
      themeState: {isTheme: parsedState.resumeTheme}
    };

  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return;
  }
};

export const saveState = (state) => { 
  try {
    const stateToSave = { 
      todoTasks: state.todoState.todoTasksArr,
      resumeTheme: state.themeState.isTheme
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
};