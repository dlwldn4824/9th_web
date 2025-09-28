import type { TTodo } from "../types/todo";
import { useTodoState, useTodoDispatch } from "../context/TodoContext";

interface TodoListProps {
  title: string;
  mode: "todo" | "done"; // 어떤 목록을 보여줄지
}

export const TodoList = ({ title, mode }: TodoListProps) => {
  const { todos, doneTodos } = useTodoState();
  const dispatch = useTodoDispatch();

  const list: TTodo[] = mode === "todo" ? todos : doneTodos;
  const buttonLabel = mode === "todo" ? "완료" : "삭제";
  const buttonColor = mode === "todo" ? "#28a745" : "#dc3545";

  const onItemClick = (todo: TTodo) => {
    if (mode === "todo") {
      dispatch({ type: "COMPLETE", id: todo.id });
    } else {
      dispatch({ type: "DELETE", id: todo.id });
    }
  };

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {list.map((todo) => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button
              onClick={() => onItemClick(todo)}
              style={{ backgroundColor: buttonColor }}
              className="render-container__item-button"
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
