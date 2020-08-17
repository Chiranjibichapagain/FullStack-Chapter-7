import { useState } from "react";

export const useField = (type, content, author, info) => {
  const [value, setvalue] = useState("");

  const onChange = (event) => {
    setvalue(event.target.value);
  };

  const onReset = (e) => {
    e.preventDefault();
    document.getElementById("content").value = "";
    document.getElementById("author").value = "";
    document.getElementById("info").value = "";
  };

  return {
    type,
    value,
    onChange,
    onReset,
  };
};
