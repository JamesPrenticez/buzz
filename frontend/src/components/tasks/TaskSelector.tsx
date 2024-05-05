import React,  { type ReactElement } from"react";
import { Autocomplete } from "@components/ui";
import { createValidationSchema, resolver, useForm, v } from "@util/formValidation";
import { capitalizeFirstLetter } from "@util";

interface ITask {
  task: string;
}

function TaskSelector(): ReactElement {

  const mockData: ITask = {
    task: "exercise",
  } 
  
  const tasks = [
    { label: "Exercise", value: "exercise" },
    { label: "Work", value: "work" },
    { label: "Meditate", value: "meditate" },
    { label: "Sleep", value: "sleep" },
  ];
  
  const validationSchema = createValidationSchema({
    task: v.required().string().minLength(1),
  })
  
  
  const { 
    formData,
    setFieldValue,
  } = useForm<ITask>({
    initialState: mockData, 
    validationSchema: validationSchema,
    validatorFn: resolver,
    onSubmit: handleSave // JS hoisting
  });
  
  function handleSave(){
    console.log("save")
  }


  return (
    <div className="ml-4 mb-4">
      <label htmlFor="country" className="relative">
        <p className="font-[500]">Activity</p>
        <Autocomplete
          className=""
          options={tasks}
          value={capitalizeFirstLetter(formData.task)}
          onChange={(newValue: string) => {
            setFieldValue("task", capitalizeFirstLetter(newValue));
          }}
        />
      </label>
    </div>
  );
}

export default TaskSelector;
