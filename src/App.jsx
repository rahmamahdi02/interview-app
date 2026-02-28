import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CommentList from './components/CommentsList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <CommentList />
      </div>
    </>
  )
}

export default App
