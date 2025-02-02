import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import * as todoAPI from '../apis/todo'

const TodoList = ({todoList,onToggle,onRemove}) => {

  const [page, setpage] = useState(1)
  const [newList, setnewList] = useState([])

  const addList = async (page) => {
    try {
        const response = await todoAPI.getList(page);
        const data = response.data;
        if(page > data.pagination.last){
          alert('마지막 페이지입니다.')
          return
        }
        const newTodoList = [...newList, ...data.list]
        setnewList(newTodoList)
        setpage(page)
    } catch (error) {
        console.error('todoList 오류 발생:', error);
    }
  }

  const handleScroll = () => {
    const todoListElement = document.querySelector('.todoList') 
    let scrollHeight = todoListElement.scrollHeight 
    let scrollTop = todoListElement.scrollTop
    let clientHeight = todoListElement.clientHeight
    if(scrollHeight - scrollTop == clientHeight){
      addList(page+1)
    }
  }

  useEffect(() => {
    const todoListElement = document.querySelector('.todoList')
    if(todoListElement){
      todoListElement.addEventListener('scroll',handleScroll)
    }
    return () => {
      if(todoListElement){
        todoListElement.removeEventListener('scroll',handleScroll)
      }
    }
  })
  

  return (
    <div className="todoList">
      <ul>
          {
              todoList.map((todo) => (
                  <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={onToggle} 
                    onRemove={onRemove}
                  />
              ))
          }
      </ul>
      <ul id="new-list">
        {
          newList.map((todo) => (
                  <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={onToggle} 
                    onRemove={onRemove}
                  />
          ))
        }
      </ul>
    </div>
  )
}

export default TodoList