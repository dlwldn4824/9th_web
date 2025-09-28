// src/context/TodoContext.tsx
import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type { TTodo } from "../types/todo";

type State = {
  todos: TTodo[];
  doneTodos: TTodo[];
};

type Action =
  | { type: "ADD"; text: string }
  | { type: "COMPLETE"; id: number }
  | { type: "DELETE"; id: number };

const initialState: State = {
  todos: [],
  doneTodos: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD": {
      const text = action.text.trim();
      if (!text) return state;
      const newTodo: TTodo = { id: Date.now(), text };
      return { ...state, todos: [newTodo, ...state.todos] };
    }
    case "COMPLETE": {
      const target = state.todos.find((t) => t.id === action.id);
      if (!target) return state;
      return {
        todos: state.todos.filter((t) => t.id !== action.id),
        doneTodos: [target, ...state.doneTodos],
      };
    }
    case "DELETE": {
      return {
        ...state,
        doneTodos: state.doneTodos.filter((t) => t.id !== action.id),
      };
    }
    default:
      return state;
  }
}

const StateCtx = createContext<State | undefined>(undefined);
const DispatchCtx = createContext<Dispatch<Action> | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

export function useTodoState() {
  const ctx = useContext(StateCtx);
  if (!ctx) throw new Error("useTodoState must be used within TodoProvider");
  return ctx;
}

export function useTodoDispatch() {
  const ctx = useContext(DispatchCtx);
  if (!ctx) throw new Error("useTodoDispatch must be used within TodoProvider");
  return ctx;
}
