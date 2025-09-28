import type { FormEvent, Dispatch, SetStateAction } from "react";

interface TodoFormProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>; // (input: string) => void 도 가능
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const TodoForm = ({ input, setInput, handleSubmit }: TodoFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        placeholder="할일 입력"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};
