import React, { useCallback, useMemo, useState } from 'react'

// Individual Todo Component

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => (
    <li>
        <label>
            <input type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)} />
            <span>{todo.text}</span>
        </label>
        <button
            onClick={() => onDelete(todo.id)}
        >Delete</button>
    </li>
));

const FILTERS = {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
};

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [input, setInput] = useState("");

    const addTodo = useCallback(() => {
        if(input.trim()) {
            setTodos((prev) => [
                ...prev,
                { id: Date.now(), text: input.trim(), completed: false },
            ]);
            setInput("");
        }
    }, [input]);

    const toggleTodo = useCallback((id) => {
        setTodos((prev) =>
            prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo )
        );
    }, []);

    const deleteTodo = useCallback((id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }, []);

    const filteredTodos = useMemo(() => {
        return todos.filter(FILTERS[filter]);
    }, [todos, filter]);

  return (
    <>
    <div>
        <h1>Todo List</h1>

        <div>
            <input type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                placeholder='What needs to be done?' />
            <button
                onClick={addTodo}>Add</button>
        </div>

        <ul>
            {
                filteredTodos.map((todo) => (
                    <TodoItem 
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}    
                    />
                ))
            }
        </ul>

        <div>
            {
                ["all", "active", "completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}>{f[0].toUpperCase() + f.slice(1)}</button>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default TodoList