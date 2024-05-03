import React, { type ReactElement } from 'react'
import Stopwatch from './Stopwatch'
import Countdown from './Countdown';
import { Tab, Tabs } from '@components/ui';
import { toUppperCase } from '@util';
import { TaskSelector } from '@components/tasks';

function Timer(): ReactElement {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(50%_100%_at_50%_50%,rgba(0,255,0,0.20)_0%,rgba(0,0,255,0.10)_100%)]">
      <Tabs className='bg-transparent'>
        <Tab className="bg-transparent h-full flex items-center justify-between" name={toUppperCase("stopwatch")}>

          {/* <TaskSelector /> */}
          <section className='bg-red-500 w-full h-full'>
            a
          </section>
          <section className="w-full h-full flex items-center justify-center">
            <Stopwatch />
          </section>
          <section className='bg-yellow-500 w-full h-full'>
            c
          </section>
        </Tab>
        <Tab className="h-[500px] flex items-center justify-center" name={toUppperCase("countdown")}>
          <Countdown />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Timer;