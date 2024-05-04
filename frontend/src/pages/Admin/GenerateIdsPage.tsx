import { DatePicker, Label } from '@components/ui';
import React from 'react'

function GenerateIdsPage() {
  const dateNow = new Date().toISOString();
  
  return (
    <div >
      {/* <section>{date.toISOString()}</section> */}
      <section className='border border-major/50 ronded-md p-4'>
        <Label value="Start Date:" >

        <DatePicker />
        </Label>
        {dateNow}
      </section>
    </div>
  )
}

export default GenerateIdsPage