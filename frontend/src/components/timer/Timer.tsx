import React, { type ReactElement } from 'react'
import Stopwatch from './Stopwatch'
import Countdown from './Countdown';
import { Tab, Tabs } from '@components/ui';
import { toUppperCase } from '@util';
import { TaskSelector } from '@components/tasks';

function Timer(): ReactElement {
  return (
    <Tabs>
      <Tab className="h-[500px] flex items-center justify-center" name={toUppperCase("stopwatch")}>
        <div>
          <section>
            <TaskSelector />
          </section>
          <section>
            <Stopwatch />
          </section>
        </div>
      </Tab>
      <Tab className="h-[500px] flex items-center justify-center" name={toUppperCase("countdown")}>
        <Countdown />
      </Tab>
    </Tabs>
  )
}

export default Timer;