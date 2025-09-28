import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useTodo } from "../context/TodoContext";

const Todo = () => {
  const {todos, completeTodo,deleteTodo,doneTodos} = useTodo();

  // return 다음 줄바꿈 에러 방지: 괄호를 같은 줄에 시작
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">Dew Todo</h1>

      <TodoForm/>

      {/* 나중에 todoform 만들어서 파일 import해서 가져옴 */}
      <div className="render-container">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo} //context?.completeTodos는?
          /*context?.completeTodos 처럼 물음표(?.) 가 들어간 건 옵셔널 체이닝(optional chaining) 문법이에요.
          정리  
          ?. = 옵셔널 체이닝
          객체가 null 또는 undefined일 때 안전하게 접근하기 위해 씀
          context가 undefined일 수 있기 때문에 붙여둔 것*/
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

