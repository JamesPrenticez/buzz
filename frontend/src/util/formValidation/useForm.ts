import { useState } from 'react';

interface IValidationSchema {
  [field: string]: any;
}

interface IUseForm<T> {
  initialState: T;
  validationSchema: IValidationSchema;
  validatorFn: (data: T, schema: Record<string, any>) => Record<string, IValidationResult>;
  onSubmit?: Function;
}

type IValidationResult = { isValid: boolean; errorMessage?: string | null };

export function useForm<T>({
  initialState,
  validationSchema,
  validatorFn,
  onSubmit
}: IUseForm<T>) {

  const initialErrors = getInitalErrors(initialState, validationSchema, validatorFn)

  const [formData, setFormData] = useState<T>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, IValidationResult>>(initialErrors);
  // console.log(formErrors)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldKey = e.target.name ? e.target.name : e.target.id

    if (!fieldKey) {
      throw new Error("please provide a name or id attribute for your input");
    }

    const newValue = e.target.value as unknown as T[keyof T];

    const updatedFormData = {
      ...formData,
      [fieldKey]: newValue
    };

    // Validates the entire schema
    const validationResult = validatorFn(updatedFormData, validationSchema);
    // Append single field to prev results, thus only preforming validation on one feild at a time
    const mergedValidationResult = {...formErrors, [fieldKey]: validationResult[fieldKey]};

    setFormData(updatedFormData);
    setFormErrors(mergedValidationResult);
  };

  const setFieldValue = (fieldKey: keyof T, newValue: T[keyof T]) => {
    if (!fieldKey) {
        throw new Error("Field key is required");
    }

    setFormData(prevFormData => ({
        ...prevFormData,
        [fieldKey]: newValue
    }));

    // Validates the entire schema
    const validationResult = validatorFn({ ...formData, [fieldKey]: newValue }, validationSchema);

    // Append single field to prev results, thus only performing validation on one field at a time
    // Using type assertion to treat `fieldKey` as a string
    const mergedValidationResult = { ...formErrors, [fieldKey as string]: validationResult[fieldKey as string] };

    setFormErrors(mergedValidationResult);
};

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationResult = validatorFn(formData, validationSchema);
  
    // Check if all fields are valid
    const isFormValid = Object.values(validationResult).every(result => result.isValid);
  
    setFormErrors(validationResult);
  
    if (isFormValid && onSubmit) {
      onSubmit();
    } 

    return
  };

  return {
    formData,
    formErrors,
    handleChange,
    setFieldValue,
    handleSubmit,
  };
}

// Don't show validation errors for fields that are initially empty, but you will show errors for fields that have initial values that fail validation
// We don't need to type safe this function because it just an abstraction from above for readability
function getInitalErrors(initialState: any, validationSchema: any, validatorFn: any){

  const initialErrors = Object.keys(initialState).reduce((acc, key) => {
    const value = initialState[key];
    if (value !== null && value !== undefined && value !== '') {
      // Validate only if there is a value in the field

      if (!validationSchema[key]) {
        throw new Error(`Field [${key}] missing from schema`);
      }

      const fieldValidationResult = validatorFn({ [key]: value }, { [key]: validationSchema[key] });
      acc[key] = fieldValidationResult[key];
    } else {
      // Initialize as valid with no error message for empty fields
      acc[key] = { isValid: true, errorMessage: '' };
    }
    return acc;
  }, {} as Record<string, IValidationResult>);

  return initialErrors
}
