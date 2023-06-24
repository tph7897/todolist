import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'level 1 과제', contents: 'todolist 만들기', success: false }
  ]);

  const [title, setTitle] = useState('');
  const [contents, setcontents] = useState('');

  // 제목 필드가 변경된 경우
  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  // 내용 필드가 변경된 경우
  const oncontentsChangeHandler = (event) => {
    setcontents(event.target.value);
  };

  // 추가하기 버튼을 눌렀을 때
  const addTodoButtonHandler = () => {
    const newTodo = {
      id: todos.length + 1,
      title: title,
      contents: contents,
      success: false
    };
    // 원래 있던 todos 배열을 풀고 newTodo를 넣은 후 다시 배열로 만든다
    setTodos([...todos, newTodo]);
    setTitle('')
    setcontents('')
  };

  // 삭제하기 버튼을 눌렀을 때
  const clickDeleteTodoButton = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // 완료하기 버튼을 눌렀을 때
  const successTodoButton = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: id,
          title: todo.title,
          contents: todo.contents,
          success: true
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // 취소하기 버튼을 눌렀을 때
  const cancelTodoButton = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          id: id,
          title: todo.title,
          contents: todo.contents,
          success: false
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const inProgressTodos = todos.filter((todo) => !todo.success);
  const completedTodos = todos.filter((todo) => todo.success);

  return (
    <div className='background'>
      <div className='layout' >
        <div className='top'>
          <div>오늘의 할일</div>
          <div>React</div>

        </div>

        <div className="input-container">
          <label className="form-label">제목</label>
          <input type="text" value={title} onChange={onTitleChangeHandler} />
          <label className="form-label">내용</label>
          <input type="text" value={contents} onChange={oncontentsChangeHandler} />
          <button className='plusbutton' onClick={addTodoButtonHandler}>추가하기</button>
        </div>
        <div className='list-container'>
          <h2>진행중... 🔥</h2>
          <div className="Progress">
            {inProgressTodos.map((item) => (
              <div key={item.id} className="todo-container">
                <h2>{item.title}</h2>
                <p>{item.contents}</p>
                <div className='buttonSet'>
                  <button className='cancelbutton' onClick={() => clickDeleteTodoButton(item.id)}>삭제하기</button>
                  <button className='plusbutton' onClick={() => successTodoButton(item.id)}>완료!</button>
                </div>
              </div>
            ))}
          </div>
          <h2>완료! 🎉</h2>
          <div className='completed'>
            {completedTodos.map((item) => (
              <div key={item.id} className="todo-container">
                <h2>{item.title}</h2>
                <p>{item.contents}</p>
                <div className='buttonSet'>
                  <button className='cancelbutton' onClick={() => cancelTodoButton(item.id)}>취소하기</button>
                  <button className='plusbutton' onClick={() => clickDeleteTodoButton(item.id)}>삭제하기</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
