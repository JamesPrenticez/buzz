import React, { ReactNode } from 'react'
import dayjs from 'dayjs';
import { getWeekData, dayLabels } from "@util";
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import  weekday from 'dayjs/plugin/weekday'

dayjs.extend(weekday)

interface Props {
  todo: ITodo;
}

function TodoLayout({
  todo,
}: Props) {

  const dispatch = useAppDispatch();
  // const week = useAppSelector((state) => state.week);

  // function getDateOfSpecificWeekday(weekdayIndex: number) {
  //   // today's date
  //   const today = dayjs();
  
  //   // find the difference between today's weekday and the desired weekday
  //   const diff = weekdayIndex - today.weekday();
  
  //   // calculate the date of the desired weekday
  //   const targetDate = today.add(diff, 'day');
  
  //   return targetDate.format('YYYY-MM-DD')
  // }

  // const handleAddDay = (day_index: number) => {
  //   console.log("add");

  //   const new_day: Omit<IDay, '_id'> = {
  //     todo_id: todo._id,
  //     date: getDateOfSpecificWeekday(day_index),
  //     status: true
  //   };

  //   // Dispatch the addDay thunk with the todo_id and newDay data
  //   dispatch(addDay({ todo_id: todo._id, new_day: new_day }));
  // };

  // Update status
  const handleUpdateStatus = (todo_id: string, day_id: string, current_status: boolean | null) => {
    let new_status = current_status === null 
      ? true 
    : current_status === true 
      ? false 
    : current_status === false
      ? true
    : null;

    //dispatch(updateDayStatusByTodoId({ todo_id, day_id, new_status }));
  };

  const buildWeekArray = (data: IDay[], start_date: string, end_date: string) => {
    let date = dayjs(start_date); 
    const endDate = dayjs(end_date);
    const resultArray = [];
  
    while (date.isBefore(endDate) || date.isSame(endDate)) {
      const existingData = data.find(item => item.date === date.format('YYYY-MM-DD'));
      if (existingData) {
        resultArray.push(existingData);
      } else {
        const emptyDay: IDay = {
          _id: "",
          todo_id: todo._id,
          date: date.format('YYYY-MM-DD'),
          status: null,
        }
        resultArray.push(emptyDay);
      }
      date = date.add(1, 'day');
    }
  
    return resultArray;
  }

  const renderTodoBoxes = () => {
    let weekArrayOfObjects: IDay[] = []

    if(todo.days === undefined){
      return <div>loading...</div>
    } 

     if (week.data) {
        const startDate = new Date(week.data.start_date);
        const endDate = new Date(week.data.end_date);

        weekArrayOfObjects = todo.days.filter(day => {
            const date = new Date(day.date);
            return date >= startDate && date <= endDate;
        });

        if (todo.days.length < 7 && weekArrayOfObjects.length < 7) {
          weekArrayOfObjects = buildWeekArray(todo.days, week.data.start_date, week.data.end_date);
        }

    } else {
      return <div>Error - no week data</div>;
    }

    // is this required?
    const sortedWeekObjects = weekArrayOfObjects.sort((a, b) => {
      return dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1;
    });

    return sortedWeekObjects.map((day, index) => {

      const renderTodoStatusIcon = () => {
        if (day.status === null) {
          return (
            <TodoContainer
              key={day._id + index}  
              date={day.date}
              bgcolor={todo.bgcolor ?? ""}
              onClick={() => handleAddDay(dayjs(day.date).weekday())}
            >
              <div 
                className='pointer-events-none select-none w-full h-full flex flex-col items-center justify-center relative'
                style={{ 
                  fontSize: 50, 
                  color: "#f9fafbD9",
                  fontWeight: 500,
                }}
              >
-
              </div>
            </TodoContainer>
          )
        } 
        else if (day.status === true) {
          return (
            <TodoContainer 
              date={day.date}
              bgcolor={todo.bgcolor ?? ""}
              onClick={() => { handleUpdateStatus(todo._id, day._id, day.status ) }}
            >
  X
            </TodoContainer>
          )
        }
        else if (day.status === false) {
          return (
            <TodoContainer 
              date={day.date}
              bgcolor={todo.bgcolor ?? ""}
              onClick={() => { handleUpdateStatus(todo._id, day._id, day.status ) }}
            >
O
            </TodoContainer>
          )
        } 
      }
      
      return renderTodoStatusIcon()
    })
  }

  return (
    <div className='grid grid-cols-7 h-full items-center justify-center w-full gap-x-2'>
      {renderTodoBoxes()}
    </div>
  )
}

export default TodoLayout;

interface TodoContainerProps {
  date: string,
  bgcolor: string,
  onClick: () => void,
  children: ReactNode
}

function TodoContainer({
  date,
  bgcolor,
  onClick,
  children
}: TodoContainerProps ){
  const week = getWeekData();

  return (
    <div
      key={date} 
      className='bg-white/40 hover:bg-white/80 rounded-lg w-full aspect-square flex items-center justify-center cursor-pointer relative text-[35px]'
      style={{
        // filter: date === week.data.current_date ? 'drop-shadow(0 0 0.75rem rgb(255 255 255) )' : '',
        // boxShadow: date === week.data.current_date ? '0px 0px 24px 0px #0F0' : '',
        // border: date === week.data.current_date ? 'solid 1px white' : '',
      }}
      onClick={() => onClick()}
    >
      {children}
      <p 
        className='absolute bottom-1 text-[16px]'
        style={{
          color: date === week.data.current_date ? '#f9fafbD9' : bgcolor
        }}
      >

      </p>
    </div>
  )
}