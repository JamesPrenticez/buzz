import React, { type ReactElement } from 'react'
import Stopwatch from './Stopwatch'
import Countdown from './Countdown';
import { Tab, Tabs } from '@components/ui';
import { toUppperCase } from '@util';
import { TaskSelector } from '@components/tasks';
import { useAppSelector } from '@redux/hooks';
import { IUserTasks } from '@models';
import { Loading } from '@components/common';
import { useGetUserTasksQuery } from '@redux/services';

function Timer(): ReactElement {
  const { tasks } = useAppSelector((state) => state.user.data);
  const { data, isLoading} = useGetUserTasksQuery({start_date: "2024-05-02", end_date: "2024-05-02"});


  console.log(data)

  return (
    <div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_50%,rgba(0,255,0,0.20)_0%,rgba(0,0,255,0.10)_100%)]">
      <Tabs className='bg-transparent' defaultActiveIndex={1}>

        <Tab className="bg-transparent flex items-center justify-center" name={toUppperCase("countdown")}>
          <Countdown />
        </Tab>
        <Tab className="bg-transparent flex flex-grow items-center justify-between" name={toUppperCase("stopwatch")}>

          <section className='bg-red-5000 w-full h-full'>
            <TaskSelector />
            <TaskDisplay isLoading={isLoading} tasks={tasks ?? []}/>
          </section>
          <section className="w-full h-full flex items-center justify-center">
            <Stopwatch />
          </section>
          <section className='bg-yellow-5000 w-full h-full'>
            
          </section>
        </Tab>

        <Tab className="bg-transparent flex items-center justify-center" name={toUppperCase("add manually")}>
          <h1>Add time manually</h1>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Timer;

interface Props {
  isLoading: boolean;
  tasks: IUserTasks[];
}


function TaskDisplay({isLoading, tasks}: Props){
  return (
    <div className='bg-fern rounded-md flex h-[80%] ml-4 shadow-md shadow-[#1c281f]'>

      {tasks.length > 0 && 
        tasks.map((task) => (
          <p key={task.id}>{task.description}</p>
        ))
      }
      {isLoading && <Loading />}

      

    </div>
  )
}