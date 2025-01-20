import React from 'react'

const TodoFooter = ({onRemove,onToggle}) => {
  return (
    <div className="footer">
        <div className="item">
            <button className="btn" onClick={()=>onRemove(null)}>전체삭제</button>
        </div>
        <div className="item">
            <button className="btn" onClick={()=>onToggle(null)}>전체완료</button>
        </div>
    </div>
  )
}

export default TodoFooter