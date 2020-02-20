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
        <form className ="todoForm" onSubmit={handleSubmit}> 
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
        {text: 'Learn about React'},
        {text: 'Meet friends for Lunch'},
        {text: 'Design a cool to-do app'}
    ]);

    const Todo = ({todo}) => <div className="todo">{todo.text}<img onClick={e=> deleteTodos(todo)} className="delete-icon" src="blue-delete.png" width="20px" height="20px"/></div>

    const deleteTodos = item => {
        const newTodos = todos.filter(todo => todo.text !== item.text)
        setTodos(newTodos)
    }
    const addTodos = item => {
        const newTodos = [...todos,{text: item}];
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
