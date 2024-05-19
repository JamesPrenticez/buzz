import React, {useEffect} from 'react'
import { axiosInstance } from '@redux/services/axiosInstance'
import { useGetUserTasksQuery } from '@redux/services'
import { Button } from '@components/ui'

const Fetch = () => {

  const start_date = "2024-05-02"
  const end_date = "2024-05-02"

  // useEffect(() => {
  // }, [])

  function fetchTasks(){

    axiosInstance.get(`http://localhost:5000/api/user/tasks?start_date=${start_date}&end_date=${end_date}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error('Error fetching user tasks:', error);
    });
    
    return;
  }

  const { data, isLoading} = useGetUserTasksQuery({start_date: start_date, end_date: end_date});
  console.log(isLoading, data)

  return (
    <div>
      <Button 
        color="cta"
        onClick={fetchTasks}
      >
        Fetch Tasks
      </Button>
    </div>
  )
}



export default Fetch