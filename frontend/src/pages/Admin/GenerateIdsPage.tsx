import React from 'react'

function GenerateIdsPage() {
  const date = new Date(2024, 1, 5);
  
  return (
    <div >
      <section>{date.toString()}</section>
      <section></section>
    </div>
  )
}

export default GenerateIdsPage