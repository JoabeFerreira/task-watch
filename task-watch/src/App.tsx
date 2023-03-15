import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Time } from './models/time';

function App() {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState<Time>(new Time());
  const [plannedTask, setPlannedTask] = useState<Time>(new Time());
  const timerRef = useRef<HTMLDivElement>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const startedDate = useRef<Date>()

  useEffect(() => {
    if (!isTimerRunning) return

    const intervalId = setInterval(() => {
      if (!timerRef.current) return;
      setProgress(oldProgress => {
        const newProgress = oldProgress + 5
        timerRef!.current!.style.background = `conic-gradient(#AA77FF ${progressToDegrees(newProgress)}deg, #1a1a1a 0deg)`
        return newProgress
      })
      setTimeElapsed(timeElapsed.addSeconds(1))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isTimerRunning])

  const progressToDegrees = (progress: number) => {
    return (360 * progress) / 100
  }

  const startTimer = () => {
    startedDate.current = new Date()
    setIsTimerRunning(true)
  };
  return (
    <div className="App">
      <div>
        <input type="number" value={plannedTask.hours} onChange={e => setPlannedTask({...plannedTask})} />
        <input type="number" />
        <input type="number" />
      </div>
      <div ref={timerRef} className="timer">
        <div className="progress-display">
          {progress}%
        </div>
      </div>
      <div className="time-elapsed">
        <span>{timeElapsed.display()}</span>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={() => setIsTimerRunning(false)}>Pause</button>
    </div>
  )
}

export default App
