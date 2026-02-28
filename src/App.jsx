import { useState } from 'react'
import './App.css'
import CommentList from './components/CommentsList';

function App() {

  return (
    <>
      <div>
        <h1>Search User Comments</h1>
      <CommentList />
      </div>
    </>
  )
}

export default App
