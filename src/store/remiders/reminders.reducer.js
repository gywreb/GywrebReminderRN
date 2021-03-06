import { ADD_REMINDER, REMOVE_REMINDER } from "./reminders.action";

const initialState = {
  lastId: 0,
  list: [],
};

export default function reminderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REMINDER: {
      return {
        ...state,
        list: [...state.list, { ...action.payload }],
        lastId: state.lastId + 1,
      };
    }
    case REMOVE_REMINDER: {
      return {
        ...state,
        list: state.list.filter((reminder) => reminder.id !== action.payload),
      };
    }
    default: {
      return state;
    }
  }
}
