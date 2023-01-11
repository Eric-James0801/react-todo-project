import React, {useState, useEffect} from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
//import { v4 as npm install uuidv4 } from "uuid";
import { Routes, Route} from "react-router-dom"
import About from "../pages/About"
import NotMatch from "../pages/NotMatch"
import Navbar from "./Navbar"
import SinglePage from '../pages/SinglePage'
const Todocontainer = () => {
    const uuidv4 = () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    };
    const [todos,setTodos] = useState(getInitialTodos());
    const handleChange = id => {
      setTodos(prevState => 
        prevState.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            }
          }
          return todo
        })
      )
    };

    const delTodo = id => {
      setTodos([
        ...todos.filter(todo => {
          return todo.id !== id;
        })
      ])
    };
    
    const addTodoItem = title => {
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false
      }
      setTodos([...todos, newTodo])
    }

    const setUpdate = (updatedTitle, id) => {
      setTodos(
        todos.map(todo => {
          if (todo.id === id) {
            todo.title = updatedTitle
          }
          return todo
        })
      )
    }
    
    // useEffect(() => {
    //   console.log("test run")

    //   const temp = localStorage.getItem("todos")
    //   const loadedTodos = JSON.parse(temp)

    //   if (loadedTodos) {
    //     setTodos(loadedTodos)
    //   }
    // }, [setTodos])
    
    function getInitialTodos() {
      // getting stored items
      const temp = localStorage.getItem("todos")
      const savedTodos = JSON.parse(temp)
      return savedTodos || []
    }

    useEffect(() => {
      // storing todos items
      const temp = JSON.stringify(todos)
      localStorage.setItem("todos", temp)
    }, [todos])
    
    const mainContainer = (
      <div className="container">
        <div className="inner">
          <Header/>
          <InputTodo addTodoProps={addTodoItem}/>
          <TodosList 
            todos={todos} 
            handleChangeProps={handleChange}
            deleteTodoProps={delTodo}
            setUpdate={setUpdate}
          />
        </div>
      </div>
    );
    
    return (
      <>
        <Navbar />
        <Routes>
          <Route exact path="/" element={mainContainer} />   
          <Route path="/about" element={<About />}/>
          <Route path="/about/:slug" element={<SinglePage />}/>
          <Route path="*" element={<NotMatch />} />
        </Routes>
      </>
    )
}

export default Todocontainer