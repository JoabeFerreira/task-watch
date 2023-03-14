import { useState } from 'react'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0);
  return (
    <div className="App">
      <div className="timer">
        <div className="progress-display">
          {progress}%
        </div>
      </div>
    </div>
  )
}

export default App
