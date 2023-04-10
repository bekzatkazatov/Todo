import React, {useState} from "react";
import EditIcon from "./components/edit-icon"
import DeleteIcon from "./components/delete-icon"


 const App = () => {
    const [todolist, setTodolist] = useState(list)
    const [todo, setTodo] = useState('')

    const handleAddTodo = () => {
        if (todo.length) {
            const newTodo = {
                id: todolist.length + 1,
                text: todo,
                completed: false
            }
            setTodo('')
            setTodolist([...todolist, newTodo])
        }
    }
    const handleDelete = (id) => {
        setTodolist(todolist.filter(todo => todo.id !== id))
        }
        const handleComplete =(id,e) =>{
        setTodolist(todolist.map(todo=>todo.id === id ?{...todo,completed: e.target.checked}: todo))
        }

  return (
      <div className={'wrapper'}>
          <div>
              <div className={'input-wrapper'}>
                  <input
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                      type="text"
                  />
                    <button className={'add-btn'} onClick={handleAddTodo}>
                        add
                    </button>
              </div>
              {
                  todolist.map((todo) => (
                      <div key={todo.id} className={`todo-wrapper ${todo.completed ?'completed': ''}`}>
                          <span>{todo.text}</span>
                          <div style={{display:"flex",alignItems:"center"}}>

                              { !todo.completed &&
                                  <button className={'edit-btn'}>
                                      <EditIcon/>
                                  </button>
                              }
                              <input type="checkbox"
                                     onChange={(e)=>handleComplete(todo.id,e)}/>

                              <button className={'edit-btn'}
                              onClick={()=>handleDelete(todo.id)}>
                                  <DeleteIcon/>
                              </button>

                          </div>
                      </div>
                  ))
              }
          </div>

      </div>
  );
}

export default App;

const list =[
    {id:1,text:'Learn React',completed: false},
    {id:2,text:'Learn Firebase',completed: false},
    {id:3,text: 'Learn GraphQl',completed: false},
    {id:4,text:'Learn React Native',completed: false}
]
