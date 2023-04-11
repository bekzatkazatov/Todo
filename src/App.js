
import React, {useEffect, useState} from "react";
import EditIcon from "./components/edit-icon"
import DeleteIcon from "./components/delete-icon"
import axios from "axios";


const App = () => {
    const [todolist, setTodolist] = useState([])
    const [todo, setTodo] = useState('')
    const [edit, setEdit] = useState(null)
    const [checkedAll, setCheckedAll] = useState(false)

    useEffect(() => {
        axios.get('https://64357ec2537112453fd7f9f7.mockapi.io/todos')
            .then(res => setTodolist(res.data))
    }, [])
    const handleAddTodo = () => {
        if (todo.length) {
            if (!!edit) {

                setEdit(null)
                setTodo('')
                axios.put(`https://64357ec2537112453fd7f9f7.mockapi.io/todos/${edit}`, {text: todo})
                    .then(({data}) => {
                        setTodolist(todolist.map(item => item.id === data.id ? data : item))
                    })
            } else {
                const newTodo = {
                    text: todo,
                    completed: false
                }
                console.log(newTodo, 'newTodo')
                setTodo('')

                axios.post('https://64357ec2537112453fd7f9f7.mockapi.io/todos', newTodo)
                    .then(res => {
                        console.log(res.data, 'res.data')
                        setTodolist([...todolist, res.data])
                    })
            }
        }
    }

    const handleDelete = (id) => {
        setTodolist(todolist.filter(todo => todo.id !== id))
        axios.delete(`https://64357ec2537112453fd7f9f7.mockapi.io/todos/${id}`)
            .then(res => {
                console.log(res.data, 'res.data')
                // setTodolist([...todolist, res.data])
            })
    }
    const handleEdit = (todo) => {
        setTodo(todo.text)
        setEdit(todo.id)
    }
    const handleComplete = (id, e) => {
        setTodolist(todolist.map(todo => todo.id === id ? {...todo, completed: e.target.checked} : todo))
    }

    useEffect(() => {
        const checkedTodos = todolist.filter(todo => todo.completed);
        setCheckedAll(checkedTodos.length === todolist.length);
    }, [todolist])

    const handleCompleteAll = (event) => {
        setTodolist(todolist.map(todo => ({...todo, completed: event.target.checked})))
        setCheckedAll(!checkedAll)
    }

    return (
        <div className={'wrapper'}>
            <div>
                <div style={{display: "flex", alignItems: "center", marginBottom: "10px", gap: '10px'}}>
                    <input type="checkbox" checked={checkedAll} onChange={handleCompleteAll} disabled={!!edit}/>
                    <div className={'input-wrapper'}>
                        <input
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            type="text"
                        />
                        <button className={'add-btn'} onClick={handleAddTodo}>
                            {!edit ? 'add' : 'edit'}
                        </button>
                    </div>
                </div>
                {
                    todolist.map((todo) => (
                        <div key={todo.id} style={{display: "flex", alignItems: "center", gap: '10px'}}>
                            <input type="checkbox"
                                   checked={todo.completed}
                                   disabled={edit === todo.id}
                                   onChange={(e) => handleComplete(todo.id, e)}/>
                            <div className={`todo-wrapper ${todo.completed ? 'completed' : ''}`}>
                                <span>{todo.text}</span>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    {!todo.completed &&
                                        <button
                                            onClick={(e) => handleEdit(todo)}
                                            className={'edit-btn'}>
                                            <EditIcon/>
                                        </button>
                                    }


                                    <button className={'edit-btn'}
                                            onClick={() => handleDelete(todo.id)}>
                                        <DeleteIcon/>
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}


export default App;


