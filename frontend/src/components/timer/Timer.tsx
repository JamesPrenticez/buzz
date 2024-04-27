import React, { type ReactElement } from 'react'
import Stopwatch from './Stopwatch'
import Countdown from './Countdown';
import { Tab, Tabs } from '@components/ui';
import { toUppperCase } from '@util';

function Timer(): ReactElement {
  return (
    <Tabs>
      <Tab className="h-[500px] flex items-center justify-center" name={toUppperCase("stopwatch")}>
        <Stopwatch />
      </Tab>
      <Tab className="h-[500px] flex items-center justify-center" name={toUppperCase("countdown")}>
        <Countdown />
      </Tab>
    </Tabs>
  )
}

export default Timer;