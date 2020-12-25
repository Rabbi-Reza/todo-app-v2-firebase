import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
import { db } from './firebase_config';
import firebase from "firebase";
import TodoListItem from './Todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    getTodos();
    }, []); // blank to run only on first launch 

  function getTodos(){
    db.collection("todoapp-v2")
    .onSnapshot(function (querySnapshot){
        setTodos(
          querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    })
  }

  const addTodo = (e) => {
    e.preventDefault();

    if (todoInput!=='') {

    db.collection("todoapp-v2")
    .add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput
    });
  }
    setTodoInput('');
  }
  
  return (
    <div className="App">
      <div
        style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems: "center",
        width: "100%",
        
        }}
      >
        <h1>💼 To-Do App 😃</h1>
        <form>
          <TextField 
            id="standard-basic" 
            label="Add a Todo"
            value={todoInput}
            style={{ width: "90vw", maxWidth: "500px",background: "white" }}
            onChange={(e) => {
              setTodoInput(e.target.value);
              // console.log(`This is the todo input: ${e.target.value}`)
            }}
             />
          <Button 
            type="submit" 
            variant="contained" 
            onClick={addTodo}
            //style={{ display: "none"}}
            style={{ width: "5vw" , height: "6vh",fontWeight: 'bold'}}
          >
            Post
          </Button>
        </form>
        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" ,background: "white" }}>
          {todos.map((todo) => (
          <TodoListItem 
            todo = {todo.todo}
            inprogress = {todo.inprogress}
            id = {todo.id}
          />
        ))}
        </div>
        
      </div>
    </div> 
  );
}

export default App;
