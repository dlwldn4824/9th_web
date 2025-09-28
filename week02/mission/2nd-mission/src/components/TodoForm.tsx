import { useState, type FormEvent } from "react";
import { useTodoDispatch } from "../context/TodoContext";

export const TodoForm = () => {
  const dispatch = useTodoDispatch();
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    dispatch({ type: "ADD", text });
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className="
          todo-container__input
          w-full
          border border-zinc-300 dark:border-zinc-600
          bg-white dark:bg-zinc-700
          text-zinc-900 dark:text-zinc-100
          placeholder:text-zinc-400 dark:placeholder:text-zinc-300
          rounded-md px-3 py-2
        "
        placeholder="할 일 입력"
        required
      />
      <button
        type="submit"
        className="
          todo-container__button
          bg-green-600 hover:bg-green-700
          text-white
          rounded-md px-4 py-2 ml-2
          transition-colors
        "
      >
        할 일 추가
      </button>
    </form>
  );
};
