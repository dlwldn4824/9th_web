import { TodoProvider } from "../context/TodoContext";
import ThemeProvider from "../context/ThemeContext";   // ✅ default import
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { DarkModeToggle } from "./DarkModeToggle";     // ✅ named export (파일이 export const 인 경우)


const Todo = () => {
  return (
    <ThemeProvider>
      <TodoProvider>
        {/* 화면 전체 배경 (라이트/다크 전환) */}
        <div className="min-h-screen w-full bg-zinc-100 dark:bg-zinc-900 transition-colors">
          {/* 카드 */}
          <div
            className="
              todo-container
              max-w-[350px] mx-auto mt-6
              rounded-xl shadow-lg p-5
              bg-white dark:!bg-zinc-800
              text-zinc-900 dark:!text-zinc-100
              transition-colors
            "
          >
            {/* 헤더 + 다크모드 토글 */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="todo-container__header m-0">Dew Todo</h1>
              <DarkModeToggle />
            </div>

            {/* 입력 폼 */}
            <TodoForm />

            {/* 리스트 영역 */}
            <div className="render-container">
              <TodoList title="할 일" mode="todo" />
              <TodoList title="완료" mode="done" />
            </div>
          </div>
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
};

export default Todo;
