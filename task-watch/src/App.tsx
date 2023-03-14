import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<HTMLDivElement>(null)
let intervalId;

  const calculateProgress = () => {
    intervalId = window.setInterval(() => {
      if (!timerRef.current) return;
      const newProgress = progress + 5
      timerRef.current.style.background = `conic-gradient(#AA77FF ${newProgress}deg, #1a1a1a 0deg)`
      setProgress(newProgress)
    }, 1000)
  }

  return (
    <div className="App">
      <div ref={timerRef} className="timer">
        <div className="progress-display">
          {progress}%
        </div>
      </div>
      <button onClick={() => calculateProgress()}>Start</button>
    </div>
  )
}

export default App
