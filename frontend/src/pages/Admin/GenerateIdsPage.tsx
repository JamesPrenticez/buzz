import { DatePicker, Label } from '@components/ui';
import { DatePicker2 } from '@components/ui/DatePicker2';
import React, {useState} from 'react'

function GenerateIdsPage() {
  const dateNow = new Date(1993, 6, 17)

  const [selectedDate, setSelectedDate] = useState(dateNow.toString());

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
  };
  
  return (
    <div >
      <section className='border border-major/50 ronded-md p-4'>
        <Label value="Start Date:" >
          <DatePicker />
        </Label>

        <Label value="End Date:">
          <DatePicker2 
            initialDate={selectedDate}
            updateDate={(date: string) => handleDateSelection(date)}
          />
        </Label>

        <h1>{dateNow.toString()}</h1>
        <h1>{selectedDate}</h1>

      </section>
    </div>
  )
}

export default GenerateIdsPage