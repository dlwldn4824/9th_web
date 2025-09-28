import { useState, type FormEvent } from "react";
import type { TTodo } from "../types/todo";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

const Todo = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prev) => [...prev, newTodo]);
      setInput(""); // 함수 호출 형태로!
    }
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    setDoneTodos((prev) => [...prev, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  // return 다음 줄바꿈 에러 방지: 괄호를 같은 줄에 시작
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">Dew Todo</h1>

      <TodoForm input={input} setInput={setInput} handleSubmit={handleSubmit} />

      {/* 나중에 todoform 만들어서 파일 import해서 가져옴 */}
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
