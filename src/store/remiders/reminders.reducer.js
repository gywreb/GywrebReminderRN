import { ADD_REMINDER, REMOVE_REMINDER } from "./reminders.action";

const initialState = {
  list: [
    {
      id: "5031f440f5d6b3f524ca265e643af770",
      title: "first reminder",
      description: "this is a 1st reminder",
    },
  ],
};

export default function reminderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REMINDER: {
      return { ...state, list: [...state.list, { ...action.payload }] };
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
