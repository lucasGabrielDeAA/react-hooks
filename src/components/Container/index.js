import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Container(props) {
  const [todos, setTodos] = useState([]);
  const { count, click } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = `${props.name !== '' ? props.name : 'User'}, you have ${todos.length} todos`;
  }, [todos]);

  const addTodo = () => {
    setTodos([...todos, { id: Math.random(), text: '' }]);
  }

  const onChangeTodo = (name, e, id) => {
    const { value } = e.target;
    setTodos(todos.map(todo => ({ ...todo, [name]: todo.id === id ? value : todo.value })));
  }

  const handleRemoveTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  const increaseRequest = () => dispatch({ type: 'INCREASE_COUNT_REQUEST' });

  const decreaseRequest = () => dispatch({ type: 'DECREASE_COUNT_REQUEST' });

  const reset = () => dispatch({ type: 'RESET_REQUEST' });

  return (
    <div className="container">
      <div className="buttonsContainer">
        <button className="confirmButton" onClick={addTodo}>
          <p> + todo </p>
        </button>
      </div>

      {todos.map((todo, index) => (
        <div key={String(todo.id)} className="todo">
          <input
            type="text"
            placeholder={`Todo ${index + 1}`}
            value={todo.text}
            onChange={value => onChangeTodo('text', value, todo.id)}
          />

          <button className="dangerButton" onClick={() => handleRemoveTodo(todo.id)}>
            <p> - todo </p>
          </button>
        </div>
      ))}

      <div className="buttonsContainer">
        <button className="confirmButton" onClick={() => increaseRequest()}>
          <p> + count </p>
        </button>

        <button className="confirmButton" onClick={() => decreaseRequest()} disabled={count === 0}>
          <p> - count </p>
        </button>

        <button className="confirmButton" onClick={() => reset()}>
          <p> reset </p>
        </button>
      </div>

      <p className="bright">{`To reach the value ${count}, you clicked ${click} times`}</p>
    </div>
  );
}
