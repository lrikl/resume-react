import { saveState } from '../utils/localStorage.js';

// Middleware - ланцюжок функцій (зазвичай 3 рівня):
// Перший рівень (store => ...): Отримує API сховища (store) один раз під час ініціалізації.
// Другий рівень (next => ...): Отримує функцію next (наступний dispatch у ланцюжку) один раз під час ініціалізації.
// Третій рівень (action => ...): Отримує action кожного разу, коли дія відправляється через dispatch. Саме ця функція виконується при кожній дії.

const localStorageMiddleware = store => next => action => {
  const result = next(action); // дозволяємо дії пройти далі (до редюсерів)

  if (action.type.startsWith('todoState/')) { // Після того, як стан оновився, перевіряємо, чи була ця дія для конкретного лічильника по його name
    const state = store.getState(); // Отримуємо поточний стан усього сховища
    saveState(state); // Зберігаємо потрібну частину в Local Storage
  }

  return result; // Повертаємо результат виконання дії (важливо для ланцюжка middleware)
};

export default localStorageMiddleware;