import React, { useRef, useState, useEffect, ReactElement, type Dispatch, type SetStateAction, ReactNode } from 'react';
import { CogIcon, PauseIcon, PlayIcon, ResetIcon } from '@components/icons';
import { observeIntersection } from '@util/observerIntersection';

type Timer = ReturnType<typeof setTimeout>;

function Stopwatch(): ReactElement {
  const [play, setPlay] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(59);
  const [timer, setTimer] = useState<Timer>();
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      observeIntersection(containerRef.current, (e) => handleSpacebar(e), "keydown");
    }
  }, []);

  const startTimer = () => {
    const startTime = Date.now() - elapsedTime * 1000; // Multiply by 1000 to convert seconds to milliseconds

    const timerId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      setElapsedTime(Math.round(elapsed / 1000)); // Round the elapsed time to whole seconds
    }, 1000);
    setTimer(timerId);
    setPlay(true);
  };

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer);
      setPlay(false);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setElapsedTime(0);
  };

  useEffect(() => {
    if (play) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => {
      stopTimer();
    };
  }, [play]);

  const formatElapsedTime = (time: number): ReactElement => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours.toString();
    const formattedMinutes = (hours > 0 && minutes < 10) ? `0${minutes}` : minutes.toString(); // add leading zero
    const formattedSeconds = ((minutes > 0 || hours > 0) && seconds < 10) ? `0${seconds}` : seconds.toString(); // add leading zero

    if(hours > 0) {
      document.title = `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s - Self Regulator`;
      return (
        <>
          <DigitWrapper value={formattedHours} unit="h"/>
          <DigitWrapper value={formattedMinutes} unit="m"/>
          <DigitWrapper value={formattedSeconds} unit="s"/>
        </>
      )
    }

    if(minutes > 0){
      document.title = `${formattedMinutes}m ${formattedSeconds}s - Self Regulator`;
      return (
        <>
          <DigitWrapper value={formattedMinutes} unit="m"/>
          <DigitWrapper value={formattedSeconds} unit="s"/>
        </>
      )
    }


    document.title = `${formattedSeconds}s - Self Regulator`;
    return (
      <>
        <DigitWrapper value={formattedSeconds} unit="s"/>
      </>
    )
  };

  const handleSpacebar = (e: any) => {
    if(!e) return
    e.preventDefault();
    setPlay(prev => !prev)
  }

 return (
    <div ref={containerRef} className="flex flex-col items-center justify-center">

        <div className="" >
          {formatElapsedTime(elapsedTime)}
        </div>

        <div className="flex space-x-2 ">
          <div className='text-gray-300 w-[50px] h-[50px] cursor-pointer hover:text-white bg-black/50 rounded-full flex items-center justify-center mt-auto'>
            <ResetIcon onClick={resetTimer}/>
          </div>

          <div className='text-gray-300 w-[70px] cursor-pointer hover:text-white bg-black/50 rounded-full'>
            {play ? 
              <PauseIcon onClick={() => setPlay(false)}/>
              : 
              <PlayIcon onClick={() => setPlay(true)}/>
            }
          </div>

          {/* Maybe save */}
          <div className='text-gray-300 w-[50px] h-[50px] cursor-pointer hover:text-white bg-black/50 rounded-full flex items-center justify-center mt-auto'>
            <CogIcon /> 
          </div>
        </div>
    </div>
  );
}

interface DigitWrapperProps {
  value: string;
  unit?: string;
}

const DigitWrapper = ({ value, unit }: DigitWrapperProps) => {
  const digits = value.split('');

  return (
    <div className="inline-block font-semibold">
      <span className="inline-block text-[100px]">
        {digits.map((digit, index) => (
          <span key={index} className="inline-block w-[65px] text-center">
            {digit}
          </span>
        ))}

      </span>
      {unit &&
        <span className={`inline-block text-[30px] mt-auto ${unit === "s" ? "w-0" : "pr-4"}`}>
          {unit}
        </span>
      }
    </div>
  );
};

export default Stopwatch;

// with milli seconds
// const [milliseconds, setMilliseconds] = useState<number>(0);
// const startTimer = () => {
//   const startTime = Date.now() - (elapsedTime * 1000 + milliseconds);
//   const timerId = setInterval(() => {
//     const now = Date.now();
//     const elapsed = now - startTime;
//     const seconds = Math.floor(elapsed / 1000);
//     const remainingMilliseconds = elapsed % 1000;
//     setElapsedTime(seconds);
//     setMilliseconds(remainingMilliseconds);
//   }, 10); // Update every 10 milliseconds to display milliseconds accurately
//   setTimer(timerId);
//   setIsRunning(true);
// };
// {elapsedTime}.{milliseconds.toString().padStart(3, '0').slice(0, 2)}