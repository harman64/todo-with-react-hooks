import React,{ useState } from "react";
import './App.css';

function TodoForm({addTodoItem}) {
    const [item, setItem] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if(!item) return;
        addTodoItem(item);
        setItem('');
    }

    return (
        <form className ="todo-form" onSubmit={handleSubmit}> 
            <input 
                type="text" 
                className="input" 
                value={item} 
                onChange ={e=> setItem(e.target.value)} 
            />
        </form>
    )
}

export default function App() {
    const [todos, setTodos] = useState([
        {text: 'Learn about React', isCompleted: false},
        {text: 'Meet friends for Lunch', isCompleted: false},
        {text: 'Design a cool to-do app', isCompleted: false}
    ]);

    const Todo = ({todo}) => (
      <div className="todo">
        <span className={todo.isCompleted?"is-completed":""}>{todo.text}</span>
        <div className="wrapper-icons">
          <button className="complete-button" onClick={e=> completeTodos(todo)}>Complete</button>
          <img onClick={e=> deleteTodos(todo)} className="delete-icon" src="blue-delete.png" width="20px" height="20px"/>
        </div>
      </div>
    );

    const completeTodos = item => {
      const newTodos = todos.map(todo => {
        if(todo.text === item.text){
          todo.isCompleted= true;
        }
        return todo;
      })
      setTodos(newTodos);
    }

    const deleteTodos = item => {
        const newTodos = todos.filter(todo => todo.text !== item.text)
        setTodos(newTodos)
    }
    const addTodos = item => {
        const newTodos = [...todos,{text: item, isCompleted: false}];
        setTodos(newTodos)
    }

    return (
        <div className="app">
            <TodoForm addTodoItem ={addTodos}></TodoForm>
            <div className="todo-list">
                {todos.map((todo, index) => 
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                    />
                )}
            </div>
        </div>
    )
}
