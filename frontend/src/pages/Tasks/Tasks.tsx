import React, { useEffect, useMemo, useState, type ReactElement } from "react";
import { NavLink } from "react-router-dom";
// import TodoLayout from "@components/todos/TodoLayout";
import dayjs from "dayjs";

import 'dayjs/locale/en-gb'; // Import the locale you want to use
import { getWeekData, dayLabels, generateTempObjectId } from "@util";
import { mockUserTasks } from "@mocks";
import SuccessAnimation from "./SuccessAnimation";

import { DatePicker, Label } from '@components/ui';
import { TaskUnit, type ITaskData, type IUserTasks } from "@models";
import ErrorAnimation from "./ErrorAnimaiton";


dayjs.locale('en-gb'); // Set the locale globally

// TODO type safty for globally avaliable tasks
// TODO enum for tasks colors
const tasksColors = {}

function Tasks(): ReactElement {

// =======================
// DATES
// =======================

const {weekNumber, startDate, endDate} = getWeekData();
const [selectedDateRange, setSelectedDateRange] = useState({ startDate, endDate });

// const ISODate = dateNow.toISOString();
// const convertedDate = new Date(ISODate)


// =======================


// =======================
// Data
// =======================

// Returned Data from serveer (ensure this is for a date range)
const data: IUserTasks[] = [
  {
    id: "1",
    title: "Exercise",
    description: "Be active for 30mins",
    target: "120000",
    unit: TaskUnit.MS,
    data: [
      // 1 minute 1 second
      { id: "1", user_id: "1", task_id: "1", date: "2024-05-15", measurement: "61000" },
      { id: "2", user_id: "1", task_id: "2", date: "2024-05-16", measurement: "121000" }
    ]
  }
]

// Loop through each task and fillEmptyDays with temp data
const memoizedModifiedUserTasks = useMemo(() => {
  console.log("calculating missing days")
  return data.map((task) => ({ 
      ...task,
      data: fillEmptyDays(task.data)
    }
  ))
}, [data, selectedDateRange]); 

function fillEmptyDays(data: ITaskData[]){
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  // Create a map for the given dates for easy lookup
  let datesMap = new Map();
  data.forEach(item => {
    datesMap.set(item.date, item);
  });

  // Initialize an array to hold the filled dates
  let filledDatesArray = [];

  // Iterate from start to end date
  let current = start;
  while (current.isBefore(end) || current.isSame(end)) {
    let formattedDate = current.format('YYYY-MM-DD');
    if (datesMap.has(formattedDate)) {
      // If the date exists in the original array, use the existing object
      filledDatesArray.push(datesMap.get(formattedDate));
    } else {
      // If the date is missing, create a new object with default values
      filledDatesArray.push({
        id: generateTempObjectId(),
        status: "temp",
        user_id: null,
        task_id: null,
        date: formattedDate,
        measurement: null,
        unit: null
      });
    }
    // Using the Day.js to increment the date stored in the current variable by one day.
    current = current.add(1, 'day');
  }

  return filledDatesArray;
}

console.log(memoizedModifiedUserTasks)


  // Update status
  const handleUpdateTaskStatus = (dayId: string) => {
    // let new_status = current_status === null 
    //   ? true 
    // : current_status === true 
    //   ? false 
    // : current_status === false
    //   ? true
    // : null;

    //dispatch(updateDayStatusByTodoId({ todo_id, day_id, new_status }));
  };

  return (
    <div className="w-full mx-auto min-h-screenNav pt-8"> 
      <div className="grid grid-col min-h-screenNav gap-8">

      <section className='border border-major/50 ronded-md p-4'>
        <div className="flex gap-4">
        <h1 className="text-7xl">Week {weekNumber}</h1>
          <Label value="Start Date:" >
            <DatePicker
              initialDate={selectedDateRange.startDate}
              updateDate={(newStartDate: string) => setSelectedDateRange((prevState) => ({ ...prevState, start_date: newStartDate }))}
            />
          </Label>

          <Label value="End Date:">
            <DatePicker
              initialDate={selectedDateRange.endDate}
              updateDate={(newEndDate: string) => setSelectedDateRange((prevState) => ({ ...prevState, start_date: newEndDate }))}
            />
          </Label>
        </div>

        {/* <h1>{selectedDate}</h1> */}
        
        {/* <h1>now {dateNow.toString()}</h1>
        <h1>ISO {ISODate}</h1>
        <h1>converted {convertedDate.toString()}</h1> */}
      </section>

      <section>
        { memoizedModifiedUserTasks.length ? "yes" : "no"}
      </section>

      {memoizedModifiedUserTasks.length ? (
        
        memoizedModifiedUserTasks.map((task) => (
        <div key={task.id} className="flex " >
          <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">


              <div className="flex gap-x-2 items-center h-24">
                <div 
                  className="h-6 w-6 rounded-full ml-auto border-2" 
                  style={{
                    // linear gradient
                    borderColor: "red"
                  }}>
                </div>
                <h1 
                  className="text-white font-bold text-[40px] md:text-5xl" 
                  style={{
                    color: "white"
                  }}
                >
                  {task.title}
                </h1>
              </div>

              <div className="flex gap-x-2 items-center justify-center ml-4">
                {task.data.map((day, index) => {


                  const determineTaskStatus = (measurement: string, target: string, unit: string): boolean | null => {
                    let status;

                    if(unit === "ms"){
                      const m = parseInt(measurement);
                      const t = parseInt(target);

                      console.log(m)

                      if(Number.isNaN(m)) return status = null;
                      if(m >= t) return true;
                    }
                    return false;
                  }

                  const getTaskStatusColor = (status: boolean | null): string => {
                    switch (status) {
                      case true: return "#0f0";
                      case false: return "#f00";
                      default: return "#ff0"; 
                    }
                  }
                 
                  const status = determineTaskStatus(day.measurement, task.target, task.unit)

                  return (
                    <div
                      onClick={() => handleUpdateTaskStatus(day.id)}
                      key={index}
                      className="
                        h-16
                        w-16
                        border-2
                        border-white/40 
                        rounded-lg
                        aspect-square 
                        flex
                        items-center
                        justify-center
                        cursor-pointer 
                        relative
                      "
                      style={{
                        borderColor: getTaskStatusColor(status),
                      }}
                    >
  
                      { 
                        status === true ? (
                          <SuccessAnimation isActive={true} />
                        )
                        : status === false ? (
                          <ErrorAnimation isActive={true}/>
                        )
                        : (
                          <p className="text-white">
                            {dayjs(day.date).format("DD")}
                          </p>
                        )
                      }
                    </div>
                  );}
                )}
              </div>

            </div>
          </div>
        ))
      ) : (
        <p>loading...</p>
      )}
      
      </div>
    </div>
  );
};

export default Tasks;

{/* <div 
  className="flex flex-col md:flex-row flex-grow px-2"
  onClick={(e) => {
    e.preventDefault(); // Prevent NavLink from firing
  }}
>
  <div className="text-white">
    {dayjs(week.current_date).format("D MMM")}
  </div>
</div> */}

  {/* <TodoLayout todo={todo} /> */}