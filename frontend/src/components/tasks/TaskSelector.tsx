import React,  { type ReactElement } from"react";
import { Autocomplete } from "@components/ui";
import { createValidationSchema, resolver, useForm, v } from "@util/formValidation";

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
    <div>
      <label htmlFor="country" className="relative">
        <p className="font-[500]">Country</p>
        <Autocomplete
          options={tasks}
          value={formData.task}
          onChange={(newValue: string) => {
            setFieldValue("task", newValue);
          }}
        />
      </label>
    </div>
  );
}

export default TaskSelector;
