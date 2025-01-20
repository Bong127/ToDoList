import React from 'react'

const TodoInput = ({input,onChange,onSubmit}) => {
  return (
    <div>
        <form onSubmit={onSubmit} action="" className='form'>
            <input 
            type="text" 
            placeholder='할 일 입력' 
            className='input' 
            value={input} 
            onChange={onChange}/>
            <button type='submit' className='btn'>추가</button>
        </form>
    </div>
  )
}

export default TodoInput