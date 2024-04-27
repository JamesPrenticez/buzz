import React, { useState, useEffect, ReactElement } from 'react';
import { useCursorPosition, useFocusBlur} from '../../hooks';

type Timer = ReturnType<typeof setTimeout>;

function Countdown(): ReactElement {
  const {
    inputRef,
    containerRef,
    isActive,
    setIsActive,
    handleBlur
  } = useFocusBlur(false);

  const [inputValue, setInputValue] = useState<string>("");
  const [placeholderValue, setPlaceholderValue] = useState<string>("123456");
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // const isEnterKeyPressed = useKeyPressed("enter")
  // const isDeleteKeyPressed = useKeyPressed("delete")

  const { realCursorPosition, updateCaret, setRealCursorPosition } = useCursorPosition(inputRef);

  useEffect(() => {
    let timerId: Timer | null = null;
  
    if (!isRunning) {
      const normalized = normalizeTimeString(inputValue);
      const seconds = timeStringToSeconds(normalized)
      const backAgain = secondsToTimeString(remainingTime)

      // console.table([normalized, seconds, backAgain])

      setRemainingTime(seconds);
    }
  
    if (isRunning && remainingTime >= 0) {
      timerId = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            if (timerId !== null) {
              clearInterval(timerId);
            }
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    }
  
    return () => {
      if (timerId !== null) {
        clearInterval(timerId);
      }
    };
  }, [isRunning, inputValue, remainingTime]);

  // Decrement inputValue while isRunning 
  useEffect(() => {
    if (isRunning) {
      const formattedInputValue = secondsToTimeString(remainingTime);
      setInputValue(formattedInputValue);

      // TODO turn this into a function and add some emojies
      const formattedTime = `${formattedInputValue.slice(0, 2)}h ${formattedInputValue.slice(2, 4)}m ${formattedInputValue.slice(4, 6)}s`;
      document.title = `${formattedTime} - Self Regulator`;
    }
  }, [isRunning, remainingTime]);


  // Handle Placeholder
  // useEffect(() => {
  //   if (!isActive) {
  //     inputValue === "" ? setPlaceholderValue("") : setPlaceholderValue(inputValue)
  //     setInputValue('');
  //   }

  //   if (isActive) {
  //     inputValue === "" ? setInputValue(placeholderValue) : setPlaceholderValue("")
  //   }

  // }, [isActive]);

  // Handle Delete Key
  // useEffect(() => {
  //   if(isActive){
  //     if(isDeleteKeyPressed){
  //       setRealCursorPosition(realCursorPosition - 1)
  //     } 
  //   }
  // }, [isActive, isDeleteKeyPressed ])

  // Handle Enter Key
  // useEffect(() => {

  //   if(isEnterKeyPressed){
  //     console.log("enter")
  //     // TODO handle blur / is active
  //     setIsRunning(true)
  //   } 
  // }, [isEnterKeyPressed])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d+$/;
  
    if (value === '') {
      setInputValue('');
    } else if (regex.test(value) || value === '0') {
      if (value.length > 6) {
        // Remove the first character if the length exceeds 6
        const newValue = value.substring(1);
        setInputValue(newValue);
      } else {
        setInputValue(value);
      }
    }
  };

  const handelUpdateCursorPosition = (position: number): void => {
    setRealCursorPosition(position)
  }
  
 return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-4 space-y-2">

        <div
          id="container"
          ref={containerRef}
          className={`"
            relative w-[500px] text-6xl rounded-md p-2 font-black"
            ${inputValue.length > 0 ? "bg-green-300" : "bg-pink-300"}`
          }
          onClick={() => setIsActive(true)}
        >

          { 
            inputValue.length > 0 ? (
              <div>
                <SpanNumber value={inputValue} position={5} isActive={isActive} realCursorPosition={realCursorPosition} handelUpdateCursorPosition={() => handelUpdateCursorPosition(5)} />
                <SpanNumber value={inputValue} position={4} isActive={isActive} realCursorPosition={realCursorPosition} handelUpdateCursorPosition={() => handelUpdateCursorPosition(4)}/>
                <span className="text-4xl" style={getStyle(inputValue, 4)}>h&nbsp;</span>
                <SpanNumber value={inputValue} position={3} isActive={isActive} realCursorPosition={realCursorPosition} handelUpdateCursorPosition={() => handelUpdateCursorPosition(3)}/>
                <SpanNumber value={inputValue} position={2} isActive={isActive} realCursorPosition={realCursorPosition} handelUpdateCursorPosition={() => handelUpdateCursorPosition(2)}/>
                <span className="text-4xl" style={getStyle(inputValue, 2)}>m&nbsp;</span>
                <SpanNumber value={inputValue} position={1} isActive={isActive} realCursorPosition={realCursorPosition} handelUpdateCursorPosition={() => handelUpdateCursorPosition(1)}/>
                <SpanNumber value={inputValue} position={0} isActive={isActive} realCursorPosition={realCursorPosition} handelUpdateCursorPosition={() => handelUpdateCursorPosition(0)}/>
                <span className="text-4xl" style={getStyle(inputValue, 0)}>s&nbsp;</span>
              </div>
            ) : (
              <div className='text-gray-300'>
                <span>{getValue(placeholderValue, 5)}</span>
                <span>{getValue(placeholderValue, 4)}</span>
                <span className="text-4xl">h&nbsp;</span>
                <span >{getValue(placeholderValue, 3)}</span>
                <span >{getValue(placeholderValue, 2)}</span>
                <span className="text-4xl">m&nbsp;</span>
                <span >{getValue(placeholderValue, 1)}</span>
                <span >{getValue(placeholderValue, 0)}</span>
                <span className="text-4xl">s&nbsp;</span>
              </div>
            )
          }

        </div>

        <div className="flex mt-6">
          <button 
            className={`py-2 px-8 rounded-md font-bold tracking-wide text-white w-32 ml-auto cursor-pointer ${isRunning ? "bg-red-500" : "bg-green-500"}`}
            onClick={() => setIsRunning(prev => !prev)}
            disabled={inputValue === "000000"} // TODO
          >
            {isRunning ? "STOP" : "START"}
          </button>
        </div>

        <div className='p-4 border-2 border-gray-300'>
        <input
          ref={inputRef}
          type="tel"
          pattern="\d*"
          value={inputValue ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          className="bg-red-300"
          onKeyDown={updateCaret} 
        />
        </div>
      </div>
    </div>
  );
}

export default Countdown;

interface ISpanNumber {
  value: string;
  position: number;
  isActive: boolean;
  realCursorPosition: number | null;
  handelUpdateCursorPosition: (position: number) => void;
}

const SpanNumber = ({
  value,
  position,
  isActive,
  realCursorPosition,
  handelUpdateCursorPosition
}: ISpanNumber ) => {
  return (
    <span 
      className='relative'
      style={{
        borderRight: "solid 2px transparent",
        borderColor: (realCursorPosition === position) && isActive ? "black" : "transparent",
        // borderColor: (realCursorPosition === position) ? "black" : "transparent",
        ...getStyle(value, position)}
      }
      onClick={() => handelUpdateCursorPosition(position)}
    >
      {getValue(value, position)}
    </span>
  )
}

const getValue = (value: string, position: number) => {
  const index = (value.length - 1) - position
  return value.charAt(index) || '0';
};

const getStyle = (value: string, position: number) => {
  const index = (value.length - 1) - position
  return value.charAt(index) ? { color: 'green' } : { color: 'red' };
};

function normalizeTimeString(timeString: string): string {
  // Pad the string with leading zeros to make it of length 6
  const paddedString = timeString.padStart(6, '0');

  // Extract hours, minutes, and seconds from the string
  let hours = parseInt(paddedString.substring(0, 2), 10);
  let minutes = parseInt(paddedString.substring(2, 4), 10);
  let seconds = parseInt(paddedString.substring(4, 6), 10);

  // Cap the initial hours to its maximum
  if (hours > 99) {
    hours = 99;
  }

  // Normalize the time
  let normalizedMinutes = minutes + Math.floor(seconds / 60);
  let normalizedSeconds = seconds % 60;

  let normalizedHours = hours + Math.floor(normalizedMinutes / 60);
  normalizedMinutes %= 60;

  // Cap the normalized hours to its maximum
  if (normalizedHours > 99) {
    normalizedHours = 99;
    normalizedMinutes = 59;
    normalizedSeconds = 59;
  }

  // Convert to strings and pad with leading zeros
  const hoursStr = String(normalizedHours).padStart(2, '0');
  const minutesStr = String(normalizedMinutes).padStart(2, '0');
  const secondsStr = String(normalizedSeconds).padStart(2, '0');

  const result = `${hoursStr}` + `${minutesStr}` + `${secondsStr}`
  return result
}

function timeStringToSeconds(timeString: string): number {
  const paddedString = timeString.padStart(6, '0');

  // Extract hours, minutes, and seconds from the string
  const hours = parseInt(paddedString.substring(0, 2), 10);
  const minutes = parseInt(paddedString.substring(2, 4), 10);
  const seconds = parseInt(paddedString.substring(4, 6), 10);

  // Convert to seconds
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  return totalSeconds;
}

function secondsToTimeString(totalSeconds: number): string {
  let hours = Math.floor(totalSeconds / 3600);
  let remainingSecondsAfterHours = totalSeconds % 3600;
  let minutes = Math.floor(remainingSecondsAfterHours / 60);
  let seconds = remainingSecondsAfterHours % 60;

  // Cap hours at 99
  if (hours > 99) {
      hours = 99;
      minutes = Math.min(Math.floor((totalSeconds - (99 * 3600)) / 60), 60);
      seconds = remainingSecondsAfterHours % 60 === 0 ? remainingSecondsAfterHours : remainingSecondsAfterHours % 60;
  }

  // Convert to HH MM SS format
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  return hoursString + minutesString + secondsString;
}