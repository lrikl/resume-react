const COUNTER_STATE_KEY = 'REDUX_TODO_LIST';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(COUNTER_STATE_KEY);
    if (serializedState === null) {
      return;
    }
    const parsedState = JSON.parse(serializedState);
    return { 
      todoState: {todoTasksArr: parsedState}
    };

  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return;
  }
};

export const saveState = (state) => { 
  try {
    localStorage.setItem(COUNTER_STATE_KEY, JSON.stringify(state.todoState.todoTasksArr));
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
};