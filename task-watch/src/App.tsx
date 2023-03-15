import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<HTMLDivElement>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  useEffect(() => {
    if (!isTimerRunning) return

    const intervalId = setInterval(() => {
      if (!timerRef.current) return;
      setProgress(oldProgress => {
        const newProgress = oldProgress + 5
        timerRef!.current!.style.background = `conic-gradient(#AA77FF ${progressToDegrees(newProgress)}deg, #1a1a1a 0deg)`
        return newProgress
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isTimerRunning])

  const progressToDegrees = (progress: number) => {
    return (360 * progress) / 100
  }

  return (
    <div className="App">
      <div ref={timerRef} className="timer">
        <div className="progress-display">
          {progress}%
        </div>
      </div>
      <div className="time-elapsed">
        <span>{timeElapsed}</span>
      </div>
      <button onClick={() => setIsTimerRunning(true)}>Start</button>
      <button onClick={() => setIsTimerRunning(false)}>Pause</button>
    </div>
  )
}

export default App
