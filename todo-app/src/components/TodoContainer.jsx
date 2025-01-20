import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'

const TodoContainer = () => {

  const [todoList, settodoList] = useState([])
  const [input, setinput] = useState('')

  const onToggle = async (todo) => {
    let data=""
    if(todo !== null){
        data = {
            ...todo,
            status: !todo.status
        }
    }else{
        data = {
            ...todo,
            id:null
        }
    }

    const option = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    try{
        const url = 'http://localhost:8080/todos'
        const response = await fetch(url, option)
        const msg = await response.text()
        console.log(msg);
        
    }catch(error){
        console.log(error);
        
    }

    getList()
  }

  const onRemove = async (id) =>{
    const option = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    let url = `http://localhost:8080/todos/${id}`
    if(id==null)
        url = 'http://localhost:8080/todos'
    console.log(url);
    
    try{
        const response = await fetch(url, option)
        const msg = await response.text()
        console.log(msg);
        
    }catch(error){
        console.log(error);
        
    }

    getList()
  }

  const onChange = (e) => {
    console.log(e.target.value);
    setinput(e.target.value);
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    let name = input
    if(input == '') setinput('제목없음')

    const data = {
        name:input,
        seq:1
    }
    const option = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    try{
        const url = 'http://localhost:8080/todos'
        const response = await fetch(url, option)
        const msg = await response.text()
        console.log(msg);
        
    }catch(error){
        console.log(error);
        
    }

    getList()
    setinput('')
  }

  const getList = () =>{
    fetch('http://localhost:8080/todos')
        .then(response => response.json())
        .then(data => {
            settodoList(data.list);
        })
        .catch(error => { console.error(error)});
  }

  useEffect(() => {
    getList()
  }, [])
  
  return (
    <div className="container">
        <TodoHeader/>
        <TodoInput input={input} onChange={onChange} onSubmit={onSubmit}/>
        <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove}/>
        <TodoFooter onRemove={onRemove} onToggle={onToggle}/>
    </div>
  )
}

export default TodoContainer