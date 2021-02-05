import { useState } from "react";

export const useField = (initialState) => {
  const [fields, setValues] = useState(initialState);

  console.log('val--', fields)
  const handleChange = (event) => {
    setValues({
      ...fields,
      [event.target.id]: event.target.value
    })
  }

  const handleReset = () => {
    setValues(initialState)
  }

  return [
    fields,
    handleChange,
    handleReset
  ];
};
