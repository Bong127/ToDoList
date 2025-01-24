import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'
import * as todoAPI from '../apis/todo'

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

    let response
    try {
      response = await todoAPI.update(JSON.stringify(data))
    } catch (error) {
      console.log(error);
      console.error(`할일수정 중 에러가 발생하였습니다.`);
      return
    }
    
    const status = response.status

    if(status == 200){
      console.log('할일수정 성공!');
      getList()
    }else{
      console.log('할일수정 실패!');
    }
  }

  const onRemove = async (id) =>{
    let response
    try {
      if(id==null)
        response = await todoAPI.remove("null")
      else
        response = await todoAPI.remove(id)
    } catch (error) {
      console.log(error);
      console.error(`할일삭제 중 에러가 발생하였습니다.`);
      return
    }
    
    const status = response.status

    if(status == 200){
      console.log('할일삭제 성공!');
      getList()
    }else{
      console.log('할일삭제 실패!');
    }
  }

  const onChange = (e) => {
    console.log(e.target.value);
    setinput(e.target.value);
  }

  const onSubmit = async (e) =>{
    e.preventDefault();
    let name = input
    if(input == '') setinput('제목없음')

    const form = {
        name:input,
        seq:1
    }
    let response
    try {
      response = await todoAPI.insert(JSON.stringify(form))
    } catch (error) {
      console.log(error);
      console.error(`할일추가 중 에러가 발생하였습니다.`);
      return
    }
    
    const status = response.status

    if(status == 201){
      console.log('할일추가 성공!');
      getList()
      setinput('')
    }else{
      console.log('할일추가 실패!');
    }
  }

  const getList = async () =>{
    try {
        const response = await todoAPI.getList();
        const data = response.data;
        settodoList(data.list);
    } catch (error) {
        console.error('todoList 오류 발생:', error);
    }
  }

  useEffect(() => {
    getList()
  }, [todoList])
  
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