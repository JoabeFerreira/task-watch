import { useEffect, useRef, useState } from 'react'
import './App.css'
import NumericUpDown from './components/numeric-updown';
import { Time } from './models/time';

function App() {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState<Time>(new Time(0, 0, 0));
  const [plannedTask, setPlannedTask] = useState<Time>(new Time(0, 0, 0));
  const timerRef = useRef<HTMLDivElement>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const startedDate = useRef<Date>()
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
      <>{console.log('plannedTask', plannedTask)}</>
      <div>
        {/* <input type="number" value={hours} onChange={e => setHours(+e.target.value)} max={24} min={0} />
        <input type="number" value={minutes} onChange={e => setMinutes(+e.target.value)} max={59} min={0}/>
        <input type="number" value={seconds} onChange={e => setSeconds(+e.target.value)} max={59} min={0}/> */}
        <input type="number" value={plannedTask.hours} readOnly />
        <input type="number" value={plannedTask.minutes} readOnly />
        <NumericUpDown value={seconds} onChange={setSeconds} min={0} max={59}/>
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
