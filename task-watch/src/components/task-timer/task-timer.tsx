import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react'
import './task-timer.css'
import { Time, Task } from '../../models/index';
import { Modal, NumericUpDown } from '..';
import Textbox from '../textbox/textbox';

function TaskTimer() {
  const [timeElapsed, setTimeElapsed] = useState(new Time(0, 0, 0));
  const [currentTask, setCurrentTask] = useState<Task>(new Task());
  const timerRef = useRef<HTMLDivElement>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showTimerSettings, setShowTimerSettings] = useState(false);


  useEffect(() => {
    if (!isTimerRunning) return

    const intervalId = setInterval(() => {
      if (!timerRef.current) return;
      const elapsed = timeElapsed.addSeconds(1)
      setTimeElapsed(elapsed)
      const progress = calculateProgress()
      timerRef!.current!.style.background = `conic-gradient(#AA77FF ${progressToDegrees(progress)}deg, var(--component-bg-color
        ) 0deg)`
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isTimerRunning])

  const progressToDegrees = (progress: number) => {
    return (360 * progress) / 100
  }

  function calculateProgress() {
    return ((timeElapsed.getTotalSeconds() * 100) / currentTask.timePlanned.getTotalSeconds())
  }

  const startTimer = () => {
    if (currentTask.timePlanned.isBlank()) {
      setShowTimerSettings(true)
      return
    }
    setShowTimerSettings(false)
    setIsTimerRunning(true)
  };

  return (
    <div className="task-timer">
      <Modal show={showTimerSettings} onClose={() => setShowTimerSettings(false)} title='Task Settings'>
        <div className='task-setting'>
          <div>
            <Textbox value={currentTask.description} label={"Description"} onChange={description => setCurrentTask({ ...currentTask, description})} />
          </div>
          <div>
            <NumericUpDown value={currentTask.timePlanned.hours} min={0} max={23}
            onChange={hours => setCurrentTask({ ...currentTask, timePlanned: currentTask.timePlanned.setHours(hours) })}/>
            <span>:</span>
            <NumericUpDown value={currentTask.timePlanned.minutes} min={0} max={59}
            onChange={minutes => setCurrentTask({ ...currentTask, timePlanned: currentTask.timePlanned.setMinutes(minutes) })}/>
            <span>:</span>
            <NumericUpDown value={currentTask.timePlanned.seconds} min={0} max={59} 
            onChange={seconds => setCurrentTask({ ...currentTask, timePlanned: currentTask.timePlanned.setSeconds(seconds) })}/>
          </div>
        </div>
        <button onClick={() => startTimer()}>Starta essa budega</button>
      </Modal>

      <div ref={timerRef} className="timer">
        <div className="timer-button">
          {!isTimerRunning
            ? <FontAwesomeIcon style={{ marginLeft: '0.15em' }} icon={faPlay} size={'2x'} onClick={startTimer} />
            : <FontAwesomeIcon icon={faPause} size={'2x'} onClick={() => setIsTimerRunning(false)} />
          }
        </div>
      </div>
      <div className="time-elapsed">
        <h1>{timeElapsed.display()}</h1>
      </div>
      <div id='task-description'>
        <h2>{currentTask.description}</h2>
      </div>
    </div>
  )
}

export default TaskTimer;