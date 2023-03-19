import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react'
import './App.css'
import NumericUpDown from './components/numeric-updown';
import { Time } from './models/time';

function App() {
  const [timeElapsed, setTimeElapsed] = useState<Time>(new Time(0, 0, 0));
  const [plannedTask, setPlannedTask] = useState<Time>(new Time(0, 0, 0));
  const timerRef = useRef<HTMLDivElement>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showTimerSettings, setShowTimerSettings] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) return

    const intervalId = setInterval(() => {
      if (!timerRef.current) return;
      const elapsed = timeElapsed.addSeconds(1)
      setTimeElapsed(elapsed)
      const progress = calculateProgress(elapsed)
      timerRef!.current!.style.background = `conic-gradient(#AA77FF ${progressToDegrees(progress)}deg, #1a1a1a 0deg)`
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isTimerRunning])

  const progressToDegrees = (progress: number) => {
    return (360 * progress) / 100
  }

  function calculateProgress(elapsed: Time) {
    return ((timeElapsed.getTotalSeconds() * 100) / plannedTask.getTotalSeconds())
  }

  const startTimer = () => {
    if (plannedTask.isBlank()) {
      setShowTimerSettings(true)
      return
    }
    setShowTimerSettings(false)
    setIsTimerRunning(true)
  };

  return (
    <div className="App">
      {showTimerSettings && <div className='timer-setting hidden'>
        <NumericUpDown value={plannedTask.hours} onChange={hours => setPlannedTask(plannedTask.setHours(hours))} min={0} max={23} />
        <NumericUpDown value={plannedTask.minutes} onChange={minutes => setPlannedTask(plannedTask.setMinutes(minutes))} min={0} max={59} />
        <NumericUpDown value={plannedTask.seconds} onChange={seconds => setPlannedTask(plannedTask.setSeconds(seconds))} min={0} max={59} />
        <button onClick={() => startTimer()}>Starta essa budega</button>
      </div>}
      <div ref={timerRef} className="timer">
        <div className="timer-button">
          {!isTimerRunning 
          ? <FontAwesomeIcon style={{marginLeft: '0.15em'}} icon={faPlay} size={'2x'} onClick={startTimer}/>
          : <FontAwesomeIcon icon={faPause} size={'2x'} onClick={() => setIsTimerRunning(false)}/>
          }
        </div>
      </div>
      <div className="time-elapsed">
        <span>{timeElapsed.display()}</span>
      </div>
    </div>
  )
}

export default App
