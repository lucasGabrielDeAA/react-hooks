import React, { useState, useEffect, useReducer } from 'react';
import logo from './logo.svg';
import './App.css';

const initialState = {
  count: 0,
  click: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREASE_COUNT_REQUEST':
      return {
        ...state,
        count: state.count + 1,
        click: state.click + 1,
      };
    case 'DECREASE_COUNT_REQUEST':
      return {
        ...state,
        count: state.count - 1,
        click: state.click + 1,
      };
    case 'RESET_REQUEST':
      return {
        ...state,
        count: 0,
        click: 0,
      };
    default:
      return state;
  }
}

function App(props) {
  const [todos, setTodos] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = `${props.name !== '' ? props.name : 'User'}, you have ${todos.length} todos`;
  }, [todos]);

  const addTodo = () => {
    setTodos([ ...todos, { id: Math.random(), text: '' } ]);
  }

  const onChangeTodo = (name, e, id) => {
    const { value } = e.target;
    setTodos(todos.map(todo => ({ ...todo, [name]: todo.id === id ? value : todo.value })));
  }

  const handleRemoveTodo = id => setTodos(todos.filter(todo => todo.id !== id));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

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
          <button className="confirmButton" onClick={() => dispatch({ type: 'INCREASE_COUNT_REQUEST' })}>
            <p> + count </p>
          </button>

          <button className="confirmButton" onClick={() => dispatch({ type: 'DECREASE_COUNT_REQUEST' })}>
            <p> - count </p>
          </button>

          <button className="confirmButton" onClick={() => dispatch({ type: 'RESET_REQUEST' })}>
            <p> reset </p>
          </button>
        </div>

        <p className="bright">{`To reach the value ${state.count}, you clicked ${state.click} times`}</p>
      </div>
    </div>
  );
}

App.defaultProps = {
  name: '',
};

export default App;
