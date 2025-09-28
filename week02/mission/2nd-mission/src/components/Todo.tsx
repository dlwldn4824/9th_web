import { TodoProvider } from "../context/TodoContext";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

const Todo = () => {
  return (
    <TodoProvider>
      <div className="todo-container">
        <h1 className="todo-container__header">Dew Todo</h1>

        {/* TodoForm은 내부에서 context dispatch로 ADD 처리 */}
        <TodoForm />

        <div className="render-container">
          {/* 할 일 목록 */}
          <TodoList title="할 일" mode="todo" />

          {/* 완료 목록 */}
          <TodoList title="완료" mode="done" />
        </div>
      </div>
    </TodoProvider>
  );
};

export default Todo;
