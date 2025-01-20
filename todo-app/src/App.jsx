import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoHeader from './components/TodoHeader';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import TodoContainer from './components/TodoContainer';

function App() {
  return(
    <>
      <TodoContainer/>
    </>
  );
}

export default App
