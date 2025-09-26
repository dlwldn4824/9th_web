// 수정
import { useState } from "react";
import type { FormEvent } from "react";

import "./index.css"; // 기존 스타일 그대로 사용

type Task = { id: number; text: string };

export default function App() {
  const [input, setInput] = useState(""); //input < usestate로 빈 값 넣어둠 
  const [todos, setTodos] = useState<Task[]>([]); // todos에 Task 형식을 받을거고 역시 빈 값
  const [done, setDone] = useState<Task[]>([]); //다 된 것도 똑같이 Task 형식

  const addTodo = (e: FormEvent) => { //e는 폼 제출 이벤트 객체 (HTML <form>이 submit될 때 발생).
    e.preventDefault(); /*<form>을 제출하면 브라우저가 페이지 새로고침을 해요.React에서는 그 동작을 막고 우리가 직접 처리해야 해서 preventDefault()를 호출*/
    const text = input.trim(); //공백 제거
    if (!text) return; //공백이면 리턴 해버리고
    setTodos((prev) => [...prev, { id: Date.now(), text }]); //prev는 이전 state 값, 이전 state 값을 받아와서 이거를 기존 stater값+ 오늘날짜를 아이디로 받고, text를 붙여서 새로운 state로 변경
    setInput("");
  };

  const completeTask = (task: Task) => { //Task를 파라미터로 받아옴
    setTodos((prev) => prev.filter((t) => t.id !== task.id)); //이전 state의 id 와 새로 받은 객체의 아이디 비교 후 같은 항목을 제거
    setDone((prev) => [task, ...prev]); //[task, ...prev]는 "새로운 항목 + 기존 배열" 형태라 최근 완료한 게 위에 오게 됨
  };

  const deleteTask = (task: Task) => {
    setDone((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <form className="todo-container__form" onSubmit={addTodo}>
        <input
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <section className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            {todos.map((t) => (
              <li key={t.id} className="render-container__item">
                <span className="render-container__item-text">{t.text}</span>
                <button
                  className="render-container__item-button"
                  onClick={() => completeTask(t)}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul className="render-container__list">
            {done.map((t) => (
              <li key={t.id} className="render-container__item">
                <span className="render-container__item-text">{t.text}</span>
                <button
                  className="render-container__item-button"
                  onClick={() => deleteTask(t)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
